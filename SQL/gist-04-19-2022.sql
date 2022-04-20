-- 4/19/22 Adding unique constraint for reblogged posts
create unique index UQ_post_user_rebloggedPost on "post" ("user", "rebloggedPost") where "rebloggedPost" is not null;
