---
title: "Upgraded-Security Debian deployment"
description: "Upgraded the security of my Terraform deployment of my Debian server"
date: "01/15/2026"
repoURL: "https://github.com/pmeaney/server011526-debian-ecom"
---

<div class="flex gap-4 my-4">
  <img src="/images-tool-logos/for-site/terraform.png" alt="Terraform" class="w-48 h-48 object-contain" />
  <img src="/images-tool-logos/for-site/debian.svg" alt="Debian" class="w-48 h-48 object-contain" />
</div>

## Project Description

As a DevOps Engineer at CDK Global, I picked up a variety of new skills & frameworks to improve my Software Projects. A very valuable one is Terraform. It's used to automatically create & destroy servers. Since working at CDK Global I've used it to create my own servers.

About a year ago I created a Terraform project to create Debian servers for my software projects. However, it was somewhat of a prototype. It lacked security features. This year, I intend to create a small online dropshipping business framework. I've been asked by friends to help them create online stores over the past couple years, so I decided to first create one for myself to get a sense of the work involved.

To create an online store, I first needed a more secure server. So, that's the point of this particular Terraform project. It's an evolution of the prototype I setup about a year ago.

## Security Evolution: From Prototype to Production

## The Challenge

The original Terraform deployment was functional but lacked critical security hardening for a production environment. More importantly, I needed a security model that would work with my international mobile workflow—developing from coffee shops in Texas, libraries across the US, and eventually cafes in Mexico while sourcing products to import.

Traditional security approaches that restrict SSH access to a single IP address weren't viable. I needed layered security that would protect the server while maintaining accessibility from anywhere in the world.

## Key Security Improvements

**1. DigitalOcean Cloud Firewall (Layer 1)**

- Configured via Terraform to allow only ports 22 (SSH), 80 (HTTP), and 443 (HTTPS)
- Blocks all other traffic at the network edge
- Prevents attacks on unexpected ports (like the PayloadCMS botnet attacks targeting port 3000)

**2. UFW Host Firewall (Layer 2)**

- Automatically configured via cloud-init on first boot
- Default deny incoming, allow outgoing policy
- Double layer of protection alongside cloud firewall
- Blocks port scanning and service exposure attempts

**3. Fail2ban Intrusion Prevention (Layer 3)**

- **Critical for mobile workflow**: Primary defense when SSH must be accessible globally
- Monitors SSH authentication attempts via systemd journal
- Automatically bans IPs after 3 failed login attempts
- 10-minute ban duration (configurable)
- Proper Debian 12 configuration using `jail.d` overrides and `systemd` backend

**4. SSH Key-Only Authentication (Layer 4)**

- Password authentication completely disabled
- Two authorized keys: human developer and GitHub Actions CI/CD bot
- Makes brute-force attacks impossible—no password to guess
- Works seamlessly with mobile workflow

**5. Kernel Hardening (Layer 5)**

- SYN flood protection (prevents DDoS attacks)
- Reverse path filtering (blocks IP spoofing)
- Disabled unnecessary features (ICMP redirects, source routing)
- Applied automatically via cloud-init sysctl configuration

## Technical Details: Debian 12 Compatibility

A significant challenge was adapting fail2ban for Debian 12's logging changes. Older Debian versions used `/var/log/auth.log` for SSH logs, but Debian 12 uses systemd's journal exclusively.

The solution required:

- Using `backend = systemd` instead of traditional log file parsing
- Creating configuration in `/etc/fail2ban/jail.d/sshd.local` to avoid duplicate section errors
- Proper cloud-init ordering to ensure fail2ban starts successfully

## Infrastructure as Code

The entire security configuration is automated:

```yaml
# Terraform provisions:
- DigitalOcean droplet
- Cloud firewall rules
- SSH key distribution
- 1Password integration for IP storage

# Cloud-init configures:
- User accounts (developer + CI/CD bot)
- UFW firewall rules
- Fail2ban installation and jails
- Kernel hardening parameters
- Docker installation
- SSH hardening
```

## Security Trade-offs

**Accepted Risk**: SSH accessible from any IP worldwide

**Mitigation**:

- Fail2ban aggressively bans brute-force attempts
- SSH key-only authentication (passwords disabled)
- Monitoring and logging for unusual activity

**Rejected Approaches**:

- ❌ Password authentication
- ❌ Root login via SSH
- ❌ Unnecessary open ports
- ❌ Unpatched systems

## Automation Workflow

The entire setup process is streamlined through 1Password CLI and shell scripts:

1. Generate SSH keys for both human user and CI/CD bot
2. Upload keys to GitHub, DigitalOcean, and 1Password
3. Export environment variables from 1Password
4. Run Terraform to provision server
5. Terraform automatically updates 1Password with server IP

This enables quick server rebuilds and consistent security configuration across deployments.

## Real-World Testing

This security model has been tested against:

- **PayloadCMS botnet attacks**: Blocked at UFW layer (port 3000 denied)
- **SSH brute-force from global IPs**: Blocked by fail2ban after 3 attempts
- **Port scanning**: Only 3 ports visible (22, 80, 443)
- **Mobile access from various locations**: Seamless authentication with SSH keys

## Future Applications

This infrastructure will support:

- Vendure eCommerce platform (multi-vendor marketplace)
- Astro-based portfolio and blog
- Flarum community forum
- Docker-based application deployments via GitHub Actions

All behind Nginx Proxy Manager for SSL termination and reverse proxying, with optional Cloudflare CDN for additional DDoS protection and global content delivery.

## Lessons Learned

**Defense in Depth Works**: Five security layers provide redundancy—if one fails, others continue protecting the server.

**Mobile Workflow is Viable**: Can't restrict by IP, but strong authentication + aggressive banning provides equivalent security.

**Automation Prevents Mistakes**: Infrastructure as Code ensures consistent security configuration and eliminates manual setup errors.

**Debian 12 Changes Matter**: Staying current with OS logging and security tooling is essential for reliable protection.

---

## Technologies Used

- **Terraform** - Infrastructure provisioning
- **DigitalOcean** - Cloud hosting
- **Debian 12** - Linux distribution
- **UFW** - Host firewall
- **Fail2ban** - Intrusion prevention
- **1Password CLI** - Secrets management
- **GitHub Actions** - CI/CD automation
- **Docker** - Application containerization
- **Nginx Proxy Manager** - Reverse proxy and SSL
