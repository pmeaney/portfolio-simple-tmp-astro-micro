import type { Metadata, Site, Socials } from "@types";

export const SITE: Site = {
  TITLE: "Patrick Meaney | Portfolio & Blog",
  DESCRIPTION: "Portfolio & Blog of Patrick Meaney",
  EMAIL: "patrick.wm.meaney@gmail.com",
  NUM_POSTS_ON_HOMEPAGE: 5,
  NUM_PROJECTS_ON_HOMEPAGE: 5,
  NUM_OLDPROJECTS_ON_HOMEPAGE: 5,
};

export const HOME: Metadata = {
  TITLE: "Home",
  DESCRIPTION: "Portfolio & Blog of Patrick Meaney",
};

export const BLOG: Metadata = {
  TITLE: "Blog",
  DESCRIPTION: "A collection of articles on topics I am passionate about.",
};

export const PROJECTS: Metadata = {
  TITLE: "Projects",
  DESCRIPTION: "A collection of my recent projects with links to repositories.",
};

export const OLDPROJECTS: Metadata = {
  TITLE: "Old Projects",
  DESCRIPTION: "A collection of my older projects with links to repositories.",
};

export const SOCIALS: Socials = [
  {
    NAME: "GitHub",
    HREF: "https://github.com/pmeaney",
  },
  {
    NAME: "Website",
    HREF: "https://pmeaney.com",
  },
];
