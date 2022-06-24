# gist

### About
Gist, formerly hosted at gist.gg, is basically a Tumblr clone. Here are some of its features:

- Rich text posts
- Image posts (with re-encoding of images during upload)
- Post comments
- Reblogging of posts
- Post popularity ranking based on reblogs and time decay
- Admin system with IP/Email/account banning
- Powered by Sails.js, Vue, Postgres, Redis, any S3 compatible object store


### Setup
- Go through the configs, especially `custom`, `env/production` and `env/staging` and switch out URLs and endpoints to what you need.
- Build a docker image with the included dockerfile
- Make sure you have a Postgres DB, Redis instance, and S3 compatible object store.
- Make a sendgrid account and get your API credentials set  up
- Run docker image with the following environment variables set (or in the configs, but not recommended since they are secrets):
  - sails_datastores__default__url
  - sails_custom__sendgridSecret
  - sails_session__host
  - sails_session__port
  - sails_session__pass
  - sails_sockets__host
  - sails_sockets__port
  - sails_sockets__pass
  - sails_custom__s3Key
  - sails_custom__s3Secret
- Run `SQL/setup.sql` on your database to set up some constraints and keys that Sails.js couldn't support with their automigration
- I recommend using Kubernetes to deploy


### License & Copyright

Copyright 2022, Philippe Gray 


Gist is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

Gist is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
