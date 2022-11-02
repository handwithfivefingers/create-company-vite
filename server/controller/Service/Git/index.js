// const exec = require('child_process').
const { execSync: exec, spawn } = require('child_process')
const crypto = require('crypto')
const sigHeaderName = 'X-Hub-Signature-256'
const sigHashAlg = 'sha256'
const secret = 'Hdme195'
const repo = '/usr/share/nginx/html/create-company-vite'

module.exports = class GitAction {
  gitPull = async (req, res) => {
    const cd = 'cd ' + repo

    const checkout = 'git checkout -- .'

    const pullCode = 'git pull'

    const installPackage = 'npm install'

    const buildPackage = 'yarn build'

    const newSource = "find ./ -type d -iname 'dist-build' -ls"

    const oldSource = "find ./ -type d -iname 'dist' -ls"

    const removeOldSource = 'rm -rf ./dist'

    const rename = 'mv ./dist-build ./dist'

    const restartPm2 = 'pm2 reload ecosystem.config.js'

    const chormium = cd + '/node_modules/puppeteer' + '/.local-chromium'

    try {
      // if (req.body.action !== 'closed') {
      //   return res.end()
      // } else {
      res.end()

      console.log(`Git action::: ${cd}`)

      exec(cd)

      exec(checkout)

      exec(pullCode)

      exec(installPackage)

      console.log(`Action::: ${buildPackage}`)

      exec(buildPackage)

      const { err: oldSourceError, stdout: oldSourcesdtout, stderr: oldSourceStdErr } = exec(oldSource)

      const { err, stdout, stderr } = exec(newSource)

      if (oldSourceError === null) {
        return
      }

      if (err === null) {
        return
      }

      if (oldSourcesdtout && stdout) {
        exec(removeOldSource)
        exec(rename)
      }

      // check folder if success

      // replace name with build folder
      // }
    } catch (err) {
      console.log('git error', err)
    } finally {
      console.log(`Action::: ${restartPm2}`)
      // exec(restartPm2)
    }
  }
}

// const REQUEST_BODY = {
//   action: 'closed',
//   number: 6,
//   pull_request: {
//     url: 'https://api.github.com/repos/handwithfivefingers/create-company-vite/pulls/6',
//     id: 1084421416,
//     node_id: 'PR_kwDOHshAj85AovUo',
//     html_url: 'https://github.com/handwithfivefingers/create-company-vite/pull/6',
//     diff_url: 'https://github.com/handwithfivefingers/create-company-vite/pull/6.diff',
//     patch_url: 'https://github.com/handwithfivefingers/create-company-vite/pull/6.patch',
//     issue_url: 'https://api.github.com/repos/handwithfivefingers/create-company-vite/issues/6',
//     number: 6,
//     state: 'closed',
//     locked: false,
//     title: 'Dev',
//     user: {
//       login: 'handwithfivefingers',
//       id: 38155994,
//       node_id: 'MDQ6VXNlcjM4MTU1OTk0',
//       avatar_url: 'https://avatars.githubusercontent.com/u/38155994?v=4',
//       gravatar_id: '',
//       url: 'https://api.github.com/users/handwithfivefingers',
//       html_url: 'https://github.com/handwithfivefingers',
//       followers_url: 'https://api.github.com/users/handwithfivefingers/followers',
//       following_url: 'https://api.github.com/users/handwithfivefingers/following{/other_user}',
//       gists_url: 'https://api.github.com/users/handwithfivefingers/gists{/gist_id}',
//       starred_url: 'https://api.github.com/users/handwithfivefingers/starred{/owner}{/repo}',
//       subscriptions_url: 'https://api.github.com/users/handwithfivefingers/subscriptions',
//       organizations_url: 'https://api.github.com/users/handwithfivefingers/orgs',
//       repos_url: 'https://api.github.com/users/handwithfivefingers/repos',
//       events_url: 'https://api.github.com/users/handwithfivefingers/events{/privacy}',
//       received_events_url: 'https://api.github.com/users/handwithfivefingers/received_events',
//       type: 'User',
//       site_admin: false,
//     },
//     body: null,
//     created_at: '2022-10-12T09:49:08Z',
//     updated_at: '2022-10-12T09:50:35Z',
//     closed_at: '2022-10-12T09:50:35Z',
//     merged_at: '2022-10-12T09:50:35Z',
//     merge_commit_sha: '382cffef8e417b45bb1511f5114d21abf7963f54',
//     assignee: null,
//     assignees: [],
//     requested_reviewers: [],
//     requested_teams: [],
//     labels: [],
//     milestone: null,
//     draft: false,
//     commits_url: 'https://api.github.com/repos/handwithfivefingers/create-company-vite/pulls/6/commits',
//     review_comments_url: 'https://api.github.com/repos/handwithfivefingers/create-company-vite/pulls/6/comments',
//     review_comment_url: 'https://api.github.com/repos/handwithfivefingers/create-company-vite/pulls/comments{/number}',
//     comments_url: 'https://api.github.com/repos/handwithfivefingers/create-company-vite/issues/6/comments',
//     statuses_url: 'https://api.github.com/repos/handwithfivefingers/create-company-vite/statuses/e862e0822e2d93f37ea18120eadd5c8c524dbcc4',
//     head: {
//       label: 'handwithfivefingers:dev',
//       ref: 'dev',
//       sha: 'e862e0822e2d93f37ea18120eadd5c8c524dbcc4',
//       user: [Object],
//       repo: [Object],
//     },
//     base: {
//       label: 'handwithfivefingers:main',
//       ref: 'main',
//       sha: 'da2bf469514f44da5932ebe5d07814335e948cc1',
//       user: [Object],
//       repo: [Object],
//     },
//     _links: {
//       self: [Object],
//       html: [Object],
//       issue: [Object],
//       comments: [Object],
//       review_comments: [Object],
//       review_comment: [Object],
//       commits: [Object],
//       statuses: [Object],
//     },
//     author_association: 'OWNER',
//     auto_merge: null,
//     active_lock_reason: null,
//     merged: true,
//     mergeable: null,
//     rebaseable: null,
//     mergeable_state: 'unknown',
//     merged_by: {
//       login: 'handwithfivefingers',
//       id: 38155994,
//       node_id: 'MDQ6VXNlcjM4MTU1OTk0',
//       avatar_url: 'https://avatars.githubusercontent.com/u/38155994?v=4',
//       gravatar_id: '',
//       url: 'https://api.github.com/users/handwithfivefingers',
//       html_url: 'https://github.com/handwithfivefingers',
//       followers_url: 'https://api.github.com/users/handwithfivefingers/followers',
//       following_url: 'https://api.github.com/users/handwithfivefingers/following{/other_user}',
//       gists_url: 'https://api.github.com/users/handwithfivefingers/gists{/gist_id}',
//       starred_url: 'https://api.github.com/users/handwithfivefingers/starred{/owner}{/repo}',
//       subscriptions_url: 'https://api.github.com/users/handwithfivefingers/subscriptions',
//       organizations_url: 'https://api.github.com/users/handwithfivefingers/orgs',
//       repos_url: 'https://api.github.com/users/handwithfivefingers/repos',
//       events_url: 'https://api.github.com/users/handwithfivefingers/events{/privacy}',
//       received_events_url: 'https://api.github.com/users/handwithfivefingers/received_events',
//       type: 'User',
//       site_admin: false,
//     },
//     comments: 0,
//     review_comments: 0,
//     maintainer_can_modify: false,
//     commits: 3,
//     additions: 172,
//     deletions: 182,
//     changed_files: 20,
//   },
//   repository: {
//     id: 516440207,
//     node_id: 'R_kgDOHshAjw',
//     name: 'create-company-vite',
//     full_name: 'handwithfivefingers/create-company-vite',
//     private: false,
//     owner: {
//       login: 'handwithfivefingers',
//       id: 38155994,
//       node_id: 'MDQ6VXNlcjM4MTU1OTk0',
//       avatar_url: 'https://avatars.githubusercontent.com/u/38155994?v=4',
//       gravatar_id: '',
//       url: 'https://api.github.com/users/handwithfivefingers',
//       html_url: 'https://github.com/handwithfivefingers',
//       followers_url: 'https://api.github.com/users/handwithfivefingers/followers',
//       following_url: 'https://api.github.com/users/handwithfivefingers/following{/other_user}',
//       gists_url: 'https://api.github.com/users/handwithfivefingers/gists{/gist_id}',
//       starred_url: 'https://api.github.com/users/handwithfivefingers/starred{/owner}{/repo}',
//       subscriptions_url: 'https://api.github.com/users/handwithfivefingers/subscriptions',
//       organizations_url: 'https://api.github.com/users/handwithfivefingers/orgs',
//       repos_url: 'https://api.github.com/users/handwithfivefingers/repos',
//       events_url: 'https://api.github.com/users/handwithfivefingers/events{/privacy}',
//       received_events_url: 'https://api.github.com/users/handwithfivefingers/received_events',
//       type: 'User',
//       site_admin: false,
//     },
//     html_url: 'https://github.com/handwithfivefingers/create-company-vite',
//     description: null,
//     fork: false,
//     url: 'https://api.github.com/repos/handwithfivefingers/create-company-vite',
//     forks_url: 'https://api.github.com/repos/handwithfivefingers/create-company-vite/forks',
//     keys_url: 'https://api.github.com/repos/handwithfivefingers/create-company-vite/keys{/key_id}',
//     collaborators_url: 'https://api.github.com/repos/handwithfivefingers/create-company-vite/collaborators{/collaborator}',
//     teams_url: 'https://api.github.com/repos/handwithfivefingers/create-company-vite/teams',
//     hooks_url: 'https://api.github.com/repos/handwithfivefingers/create-company-vite/hooks',
//     issue_events_url: 'https://api.github.com/repos/handwithfivefingers/create-company-vite/issues/events{/number}',
//     events_url: 'https://api.github.com/repos/handwithfivefingers/create-company-vite/events',
//     assignees_url: 'https://api.github.com/repos/handwithfivefingers/create-company-vite/assignees{/user}',
//     branches_url: 'https://api.github.com/repos/handwithfivefingers/create-company-vite/branches{/branch}',
//     tags_url: 'https://api.github.com/repos/handwithfivefingers/create-company-vite/tags',
//     blobs_url: 'https://api.github.com/repos/handwithfivefingers/create-company-vite/git/blobs{/sha}',
//     git_tags_url: 'https://api.github.com/repos/handwithfivefingers/create-company-vite/git/tags{/sha}',
//     git_refs_url: 'https://api.github.com/repos/handwithfivefingers/create-company-vite/git/refs{/sha}',
//     trees_url: 'https://api.github.com/repos/handwithfivefingers/create-company-vite/git/trees{/sha}',
//     statuses_url: 'https://api.github.com/repos/handwithfivefingers/create-company-vite/statuses/{sha}',
//     languages_url: 'https://api.github.com/repos/handwithfivefingers/create-company-vite/languages',
//     stargazers_url: 'https://api.github.com/repos/handwithfivefingers/create-company-vite/stargazers',
//     contributors_url: 'https://api.github.com/repos/handwithfivefingers/create-company-vite/contributors',
//     subscribers_url: 'https://api.github.com/repos/handwithfivefingers/create-company-vite/subscribers',
//     subscription_url: 'https://api.github.com/repos/handwithfivefingers/create-company-vite/subscription',
//     commits_url: 'https://api.github.com/repos/handwithfivefingers/create-company-vite/commits{/sha}',
//     git_commits_url: 'https://api.github.com/repos/handwithfivefingers/create-company-vite/git/commits{/sha}',
//     comments_url: 'https://api.github.com/repos/handwithfivefingers/create-company-vite/comments{/number}',
//     issue_comment_url: 'https://api.github.com/repos/handwithfivefingers/create-company-vite/issues/comments{/number}',
//     contents_url: 'https://api.github.com/repos/handwithfivefingers/create-company-vite/contents/{+path}',
//     compare_url: 'https://api.github.com/repos/handwithfivefingers/create-company-vite/compare/{base}...{head}',
//     merges_url: 'https://api.github.com/repos/handwithfivefingers/create-company-vite/merges',
//     archive_url: 'https://api.github.com/repos/handwithfivefingers/create-company-vite/{archive_format}{/ref}',
//     downloads_url: 'https://api.github.com/repos/handwithfivefingers/create-company-vite/downloads',
//     issues_url: 'https://api.github.com/repos/handwithfivefingers/create-company-vite/issues{/number}',
//     pulls_url: 'https://api.github.com/repos/handwithfivefingers/create-company-vite/pulls{/number}',
//     milestones_url: 'https://api.github.com/repos/handwithfivefingers/create-company-vite/milestones{/number}',
//     notifications_url: 'https://api.github.com/repos/handwithfivefingers/create-company-vite/notifications{?since,all,participating}',
//     labels_url: 'https://api.github.com/repos/handwithfivefingers/create-company-vite/labels{/name}',
//     releases_url: 'https://api.github.com/repos/handwithfivefingers/create-company-vite/releases{/id}',
//     deployments_url: 'https://api.github.com/repos/handwithfivefingers/create-company-vite/deployments',
//     created_at: '2022-07-21T16:12:21Z',
//     updated_at: '2022-07-21T16:15:11Z',
//     pushed_at: '2022-10-12T09:50:35Z',
//     git_url: 'git://github.com/handwithfivefingers/create-company-vite.git',
//     ssh_url: 'git@github.com:handwithfivefingers/create-company-vite.git',
//     clone_url: 'https://github.com/handwithfivefingers/create-company-vite.git',
//     svn_url: 'https://github.com/handwithfivefingers/create-company-vite',
//     homepage: null,
//     size: 102291,
//     stargazers_count: 0,
//     watchers_count: 0,
//     language: 'JavaScript',
//     has_issues: true,
//     has_projects: true,
//     has_downloads: true,
//     has_wiki: true,
//     has_pages: false,
//     forks_count: 0,
//     mirror_url: null,
//     archived: false,
//     disabled: false,
//     open_issues_count: 0,
//     license: null,
//     allow_forking: true,
//     is_template: false,
//     web_commit_signoff_required: false,
//     topics: [],
//     visibility: 'public',
//     forks: 0,
//     open_issues: 0,
//     watchers: 0,
//     default_branch: 'main',
//   },
//   sender: {
//     login: 'handwithfivefingers',
//     id: 38155994,
//     node_id: 'MDQ6VXNlcjM4MTU1OTk0',
//     avatar_url: 'https://avatars.githubusercontent.com/u/38155994?v=4',
//     gravatar_id: '',
//     url: 'https://api.github.com/users/handwithfivefingers',
//     html_url: 'https://github.com/handwithfivefingers',
//     followers_url: 'https://api.github.com/users/handwithfivefingers/followers',
//     following_url: 'https://api.github.com/users/handwithfivefingers/following{/other_user}',
//     gists_url: 'https://api.github.com/users/handwithfivefingers/gists{/gist_id}',
//     starred_url: 'https://api.github.com/users/handwithfivefingers/starred{/owner}{/repo}',
//     subscriptions_url: 'https://api.github.com/users/handwithfivefingers/subscriptions',
//     organizations_url: 'https://api.github.com/users/handwithfivefingers/orgs',
//     repos_url: 'https://api.github.com/users/handwithfivefingers/repos',
//     events_url: 'https://api.github.com/users/handwithfivefingers/events{/privacy}',
//     received_events_url: 'https://api.github.com/users/handwithfivefingers/received_events',
//     type: 'User',
//     site_admin: false,
//   },
// }
