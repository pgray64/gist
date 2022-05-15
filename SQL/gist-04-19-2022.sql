-- 4/19/22 Adding unique constraint for reblogged posts
create unique index UQ_post_user_rebloggedPost on "post" ("user", "rebloggedPost") where "rebloggedPost" is not null;
-- 4/23/22 Add missing FKs for users, posts, and comments
alter table post add constraint FK_post_user foreign key ("user") references "user"(id);
alter table post add constraint FK_post_rebloggedPost foreign key ("rebloggedPost") references post(id);
alter table post add constraint FK_postcomment_user foreign key ("user") references "user"(id);
alter table "postcomment" add constraint FK_postcomment_post foreign key (post) references "post"(id);
-- 4/23/22 Index for trending
create index IX_post_hotScore on "post"("hotScore" DESC);
-- 4/24/22 Unique index and FKs for following other users
create unique index UX_user_followed__user_followed_user_user_followed_user_followed_user on "user_followed__user_followed_user" ("user_followed", user_followed_user);
alter table "user_followed__user_followed_user" add constraint FK_user_followed__user_followed foreign key("user_followed") references "user"(id);
alter table "user_followed__user_followed_user" add constraint FK_user_followed__user_followed_user_user_followed_user foreign key("user_followed_user") references "user"(id);
-- 5/6/22 Post report indexes and constraints
create unique index UX_postreport_user_post on postreport("user", "post");
create index IX_post_reportCount on post("reportCount" desc) where "deletedAt" is null;
alter table postreport add constraint FK_postreport_post foreign key ("post") references post(id);
alter table postreport add constraint FK_postreport_user foreign key ("user") references "user"(id);
-- 5/14/22 Add unique indexes for user tokens
create unique index "user_passwordResetToken" ON "user" ("passwordResetToken") where "passwordResetToken"<>'';
create unique index "user_emailProofToken" ON "user" ("emailProofToken") where "emailProofToken"<>'';
-- ************************ Above scripts ran on prod db on 5/14/22 at 11PM ET *****************************************
