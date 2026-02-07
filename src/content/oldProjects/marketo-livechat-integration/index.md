---
title: "Marketo LiveChat API Integration"
description: "Automated hourly data migration from LiveChat to Marketo CRM with API rate limiting and error logging"
date: "03/15/2018"
---

<div class="flex flex-row gap-6 my-4 items-center justify-center pt-5">
  <div class="w-1/3 flex justify-center">
    <img src="/images-tool-logos/for-site/marketo.svg" alt="Marketo" class="h-16 object-contain" />
  </div>
  <div class="w-1/3 flex justify-center">
    <img src="/images-tool-logos/for-site/livechat.svg" alt="LiveChat" class="h-16 object-contain" />
  </div>
  <div class="w-1/3 flex justify-center">
    <img src="/images-tool-logos/for-site/nodejs.svg" alt="Node.js" class="h-16 object-contain" />
  </div>
</div>

## Automated Enterprise API Integration

While at Pulse Secure I wrote a script in NodeJS to migrate data from a webchat application (LiveChat) to a marketing application (Marketo), once hourly, based on a conditional decision model, and log any errors encountered. Then, once per day, a second script would email the admin about any new errors.

## Project Workflow Diagram

![Marketo LiveChat Integration Workflow](/images-old-projects/marketo-livechat/marketo-liveChat-basic-diagram.png)

The diagram above shows the complete hourly workflow: from script preparation and API key refresh, through data retrieval and comparison, to conditional data uploading with throttled async queue processing.

## Project Purpose

The purpose of the project was to assist in keeping all marketing data in one place: in Marketo's database. However, I could easily do the same sort of API integration project with applications such as Salesforce, NetSuite, or SAP. It's simply a matter of using the API endpoints to return to you the data that you're looking for.

APIs often have constraints though—in order to make sure their services don't get overburdened by requests to the point that they shut down under the heavy load. In the case of Marketo, it has a few constraints which my project needed to stay within the confines of.

Since Marketo's API constraints are what really made the project interesting, I thought I'd share with you an overview of how the script overcame these constraints (really, they're more like project criteria, to be rolled up with system requirements as part of systems analysis).

## Marketo API Constraints

![Marketo API Limits](/images-old-projects/marketo-livechat/marketo_api_limits.png)

The specific constraints I needed to work within:

(Note: These figures are as of 2018. They've since changed)

- **Daily Quota**: 50,000 API calls per day (resets daily at 12:00AM CST)
- **Rate Limit**: 100 API calls per 20 seconds
- **Concurrency Limit**: Maximum of 10 concurrent API calls
- **Batch Size Limits**:
  - Lead DB: 300 records per request
  - Asset Query: 200 records per request
- **REST API Payload Size**: 1MB maximum
- **Bulk Import File Size**: 10MB maximum
- **SOAP Max Batch Size**: 300 records
- **Bulk Extract Jobs**: 2 executing; 10 queued (inclusive)

## Project Architecture to Overcome Constraints

The constraints were interesting because adhering to them required control mechanisms which moderated the speed and volume of the flow of data, regarding both GET (data download) and POST (data upload) requests.

### Batching GET Requests

The script begins by checking the date of the last time it ran, and uses this date timeframe in its search for LiveChat data. It also does a refresh of its Marketo API key. Once it does that, it's ready to roll, and the first real step in the data flow is to get LiveChat data. LiveChat's API doesn't really have many constraints to worry about. So, once we have that data, we can compare it to Marketo's data. But first we have to get the data from Marketo in a way which optimizes API usage efficiency.

The script needed to limit GET requests for Marketo data into groups of up to 300. This means it can return up to 300 rows of Marketo data—based on the 300 email addresses from LiveChat, passed into Marketo for looking up the rows. (Once I had the LiveChat visitor data, then I needed to cross reference which of the visitors are already listed in our Marketo instance, by looking them up by email (used as a unique id), which required batching into groups of 300)

### Batching POST Requests

Once the LiveChat data was compared to the Marketo data, and I knew which data needed to flow up to Marketo (based on certain conditions—for example: if their geographical data already existed in Marketo, do not overwrite it. If it does not exist though, add it to the data object for upload), the real challenge began.

There's a limit of 10 concurrent API requests per second. NodeJS is asynchronous though. Which makes it very fast. But it's also a bit tricky to control. The problem is that without controlling the stream of POST requests—for example, let's say there were 100 visitors in the past hour—the API constraints would be quickly overwhelmed and Marketo would refuse to accept all of our POST requests.

That is, uploading those 100 units of visitor data to Marketo at full speed (thanks to asynchronicity) would be delivered within perhaps half a second or so. The problem is that Marketo doesn't want to be pinged so many times, so quickly. It wants some breathing space.

## The Solution: Async Queue Throttling

The way I ended up controlling these batches of POST requests so that all 100 data objects both don't fire all at once, immediately, is by using the NodeJS async library's `queue()` function, which allows the developer to issue the POST calls in small batches (adjustable) and at throttled increments (also adjustable). This allowed me to overcome the Rate limit and the Concurrency limit.

### Why This Matters

Basically, with asynchronous functions, they all fire immediately. With a GET request function though, two main things happen: we fire our function (the "request"), and then we receive a response from the server we're communicating with. This entire process is one concurrent API call. With asynchronous function calls though, the speed of the request/response cycle depends a lot on just internet latency speeds. This means it's hard to predict how long the request will take.

Now, the concurrency limit says there's a max of 10 per second. So, what we could do is say, run one batch of 10 per second, right? Wrong. Unfortunately, it's very possible that one or some of those requests will take a little longer than others. So, I had to adjust the batches to something like two batches of four per second, just as an example, which adds up to eight per second. Another example that could work is one batch of seven per 750ms.

But again, the success of these depends in part on internet latency, hence it's wise to err on the side of being conservative, and reducing the API calls per second to whatever amount makes sense, to ensure that it's very unlikely that we surpass the limit. This is why asynchronous programming is challenging, fun, and interesting: because it is sometimes difficult to control precisely.

## Error Handling and Monitoring

A second script ran daily to compile any errors logged throughout the previous day and email a summary to the system administrator. This ensured that any API failures, rate limit hits, or data validation errors were caught and addressed promptly.

## Technical Highlights

- Automated hourly data synchronization between two enterprise platforms
- Conditional logic to prevent data overwrites and maintain data integrity
- Asynchronous queue management to respect API rate limits
- Batch processing to optimize API quota usage
- Error logging and daily admin notifications
- Token refresh automation for continuous operation

## Real-World Impact

This integration eliminated manual data entry, ensured marketing had complete visitor context for lead nurturing, and maintained data consistency across platforms. The solution ran reliably in production, processing hundreds of visitor records daily while staying well within Marketo's API constraints.

---

## Technologies Used

- **Node.js** - Asynchronous runtime
- **Async.js** - Queue and flow control
- **Marketo REST API** - Marketing automation platform
- **LiveChat API** - Customer chat platform
- **Cron** - Scheduled job execution
