This is a sample blog template that uses Next.js and Tailwind for the frontend and [StepZen](https://stepzen.com) for the backend API. It is based upon the [Tailwind Nextjs Starter Blog](https://github.com/timlrx/tailwind-nextjs-starter-blog/) by @timlrx.

The blog combines data coming from [DEV](https://dev.to) and GitHub into a single source. It pulls blog post content from DEV and author details, bio and projects from the GitHub API. You'll need to have accounts on both to customize this to your own. In addition, your DEV profile will need to have your GitHub username populated.

Here are the steps to use this as your own:

1. Fork the related [StepZen API configuration](https://github.com/remotesynth/StepZen-DEV-GitHub-API) files. In the config, place your username and a GitHub personal access token for accessing the GitHub API. Deploy this to StepZen and grab the API URL.
2. Within the site files, create a `.env.local` file with a `STEPZEN_API_KEY` value containing your StepZen API key and a `STEPZEN_API_URL` for the API above that you deployed.
3. Run the site. You should see your blog posts from DEV and your GitHub profile info.
