-- 4/19/22 Adding unique constraint for reblogged posts
create unique index UQ_post_user_rebloggedPost on "post" ("user", "rebloggedPost") where "rebloggedPost" is not null;
-- 4/23/22 Add missing FKs for users, posts, and comments
alter table post add constraint FK_post_user foreign key ("user") references "user"(id);
alter table post add constraint FK_post_rebloggedPost foreign key ("rebloggedPost") references post(id);
alter table post add constraint FK_postcomment_user foreign key ("user") references "user"(id);
alter table "postcomment" add constraint FK_postcomment_post foreign key (post) references "post"(id);
-- 4/23/22 Index for trending
create index IX_post_hotScore on "post"("hotScore" DESC);
