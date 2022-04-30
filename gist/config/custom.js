/**
 * Custom configuration
 * (sails.config.custom)
 *
 * One-off settings specific to your application.
 *
 * For more information on custom configuration, visit:
 * https://sailsjs.com/config/custom
 */

module.exports.custom = {

  /**************************************************************************
  *                                                                         *
  * The base URL to use during development.                                 *
  *                                                                         *
  * • No trailing slash at the end                                          *
  * • `http://` or `https://` at the beginning.                             *
  *                                                                         *
  * > This is for use in custom logic that builds URLs.                     *
  * > It is particularly handy for building dynamic links in emails,        *
  * > but it can also be used for user-uploaded images, webhooks, etc.      *
  *                                                                         *
  **************************************************************************/
  baseUrl: 'http://localhost:1337',
  baseDomain: 'gist.gg',

  /**************************************************************************
  *                                                                         *
  * Display dates for your app                                              *
  *                                                                         *
  * > This is here to make it easier to change out the copyright date       *
  * > that is displayed all over the app when it's first generated.         *
  *                                                                         *
  **************************************************************************/
  platformCopyrightYear: '2022',

  /**************************************************************************
  *                                                                         *
  * The TTL (time-to-live) for various sorts of tokens before they expire.  *
  *                                                                         *
  **************************************************************************/
  passwordResetTokenTTL: 24*60*60*1000,// 24 hours
  emailProofTokenTTL:    24*60*60*1000,// 24 hours

  /**************************************************************************
  *                                                                         *
  * The extended length that browsers should retain the session cookie      *
  * if "Remember Me" was checked while logging in.                          *
  *                                                                         *
  **************************************************************************/
  rememberMeCookieMaxAge: 30*24*60*60*1000, // 30 days

  /**************************************************************************
  *                                                                         *
  * Automated email configuration                                           *
  *                                                                         *
  * Sandbox Sendgrid credentials for use during development, as well as any *
  * other default settings related to "how" and "where" automated emails    *
  * are sent.                                                               *
  *                                                                         *
  * (https://app.sendgrid.com/settings/api_keys)                            *
  *                                                                         *
  **************************************************************************/
  // sendgridSecret: 'SG.fake.3e0Bn0qSQVnwb1E4qNPz9JZP5vLZYqjh7sn8S93oSHU',
  //--------------------------------------------------------------------------
  // /\  Configure this to enable support for automated emails.
  // ||  (Important for password recovery, verification, contact form, etc.)
  //--------------------------------------------------------------------------

  // The sender that all outgoing emails will appear to come from.
  fromEmailAddress: 'noreply@gist.gg',
  fromName: 'The Gist Team',

  // Email address for receiving support messages & other correspondences.
  // > If you're using the default privacy policy, this will be referenced
  // > as the contact email of your "data protection officer" for the purpose
  // > of compliance with regulations such as GDPR.
  internalEmailAddress: 'support@gist.gg',

  // Whether to require proof of email address ownership any time a new user
  // signs up, or when an existing user attempts to change their email address.
  verifyEmailAddresses: true,

  /**************************************************************************
  *                                                                         *
  * Billing & payments configuration                                        *
  *                                                                         *
  * (https://dashboard.stripe.com/account/apikeys)                          *
  *                                                                         *
  **************************************************************************/
  // stripePublishableKey: 'pk_test_Zzd814nldl91104qor5911gjald',
  // stripeSecret: 'sk_test_Zzd814nldl91104qor5911gjald',
  //--------------------------------------------------------------------------
  // /\  Configure these to enable support for billing features.
  // ||  (Or if you don't need billing, feel free to remove them.)
  //--------------------------------------------------------------------------

  /***************************************************************************
  *                                                                          *
  * Any other custom config this Sails app should use during development.    *
  *                                                                          *
  ***************************************************************************/
  // …

  // Storage settings
  s3Region: 'nyc3',
  s3Endpoint: 'nyc3.digitaloceanspaces.com',
  staticContentS3Bucket: 'gist-static',
  staticContentS3EdgeUrl: 'https://gist-static.nyc3.cdn.digitaloceanspaces.com',
  userContentS3Bucket: 'gist-dev-cdn',
  userContentS3EdgeUrl: 'https://gist-dev-cdn.nyc3.cdn.digitaloceanspaces.com',
  // File limits
  userMaxPostImageSizeBytes: 10 * 1024 * 1024,
  userMaxPostImageSizeFriendly: '10 MB',
  userPostAllowedFiletypes: ['image/png', 'image/jpeg', 'image/gif', 'image/bmp'],
  // Pagination
  userListPostsPerPage: 12,
  userListCommentsPerPage: 12,
  followedUsersPerPage: 12,
  // Username
  usernameMinLength: 5,
  usernameMaxLength: 50,
  disallowedUsernames: {'0':true,'about':true,'access':true,'account':true,'accounts':true,'activate':true,'activities':true,'activity':true,'ad':true,'add':true,'address':true,'adm':true,'admin':true,'administration':true,'administrator':true,'ads':true,'adult':true,'advertising':true,'affiliate':true,'affiliates':true,'ajax':true,'all':true,'alpha':true,'analysis':true,'analytics':true,'android':true,'anon':true,'anonymous':true,'api':true,'app':true,'apps':true,'archive':true,'archives':true,'article':true,'asct':true,'asset':true,'atom':true,'auth':true,'authentication':true,'avatar':true,'backup':true,'balancer-manager':true,'banner':true,'banners':true,'beta':true,'billing':true,'bin':true,'blog':true,'blogs':true,'board':true,'book':true,'bookmark':true,'bot':true,'bots':true,'bug':true,'business':true,'cache':true,'cadastro':true,'calendar':true,'call':true,'campaign':true,'cancel':true,'captcha':true,'career':true,'careers':true,'cart':true,'categories':true,'category':true,'cgi':true,'cgi-bin':true,'changelog':true,'chat':true,'check':true,'checking':true,'checkout':true,'client':true,'cliente':true,'clients':true,'code':true,'codereview':true,'comercial':true,'comment':true,'comments':true,'communities':true,'community':true,'company':true,'compare':true,'compras':true,'config':true,'configuration':true,'connect':true,'contact':true,'contact-us':true,'contact_us':true,'contactus':true,'contest':true,'contribute':true,'corp':true,'create':true,'css':true,'dashboard':true,'data':true,'db':true,'default':true,'delete':true,'demo':true,'design':true,'designer':true,'destroy':true,'dev':true,'devel':true,'developer':true,'developers':true,'diagram':true,'diary':true,'dict':true,'dictionary':true,'die':true,'dir':true,'direct_messages':true,'directory':true,'dist':true,'doc':true,'docs':true,'documentation':true,'domain':true,'download':true,'downloads':true,'ecommerce':true,'edit':true,'editor':true,'edu':true,'education':true,'email':true,'employment':true,'empty':true,'end':true,'enterprise':true,'entries':true,'entry':true,'error':true,'errors':true,'eval':true,'event':true,'exit':true,'explore':true,'facebook':true,'faq':true,'favorite':true,'favorites':true,'feature':true,'features':true,'feed':true,'feedback':true,'feeds':true,'file':true,'files':true,'first':true,'flash':true,'fleet':true,'fleets':true,'flog':true,'follow':true,'followers':true,'following':true,'forgot':true,'form':true,'forum':true,'forums':true,'founder':true,'free':true,'friend':true,'friends':true,'ftp':true,'gadget':true,'gadgets':true,'game':true,'games':true,'get':true,'ghost':true,'gift':true,'gifts':true,'github':true,'graph':true,'group':true,'groups':true,'guest':true,'guests':true,'help':true,'home':true,'homepage':true,'host':true,'hosting':true,'hostmaster':true,'hostname':true,'howto':true,'hpg':true,'html':true,'http':true,'httpd':true,'https':true,'i':true,'iamges':true,'icon':true,'icons':true,'id':true,'idea':true,'ideas':true,'image':true,'images':true,'imap':true,'img':true,'index':true,'indice':true,'info':true,'information':true,'inquiry':true,'instagram':true,'intranet':true,'invitations':true,'invite':true,'ipad':true,'iphone':true,'irc':true,'is':true,'issue':true,'issues':true,'it':true,'item':true,'items':true,'java':true,'javascript':true,'job':true,'jobs':true,'join':true,'js':true,'json':true,'jump':true,'knowledgebase':true,'language':true,'languages':true,'last':true,'ldap-status':true,'legal':true,'license':true,'link':true,'links':true,'linux':true,'list':true,'lists':true,'log':true,'log-in':true,'log-out':true,'log_in':true,'log_out':true,'login':true,'logout':true,'logs':true,'m':true,'mac':true,'mail':true,'mail1':true,'mail2':true,'mail3':true,'mail4':true,'mail5':true,'mailer':true,'mailing':true,'maintenance':true,'manager':true,'manual':true,'map':true,'maps':true,'marketing':true,'master':true,'me':true,'media':true,'member':true,'members':true,'message':true,'messages':true,'messenger':true,'microblog':true,'microblogs':true,'mine':true,'mis':true,'mob':true,'mobile':true,'movie':true,'movies':true,'mp3':true,'msg':true,'msn':true,'music':true,'musicas':true,'mx':true,'my':true,'mysql':true,'name':true,'named':true,'nan':true,'navi':true,'navigation':true,'net':true,'network':true,'new':true,'news':true,'newsletter':true,'nick':true,'nickname':true,'notes':true,'noticias':true,'notification':true,'notifications':true,'notify':true,'ns':true,'ns1':true,'ns10':true,'ns2':true,'ns3':true,'ns4':true,'ns5':true,'ns6':true,'ns7':true,'ns8':true,'ns9':true,'null':true,'oauth':true,'oauth_clients':true,'offer':true,'offers':true,'official':true,'old':true,'online':true,'openid':true,'operator':true,'order':true,'orders':true,'organization':true,'organizations':true,'overview':true,'owner':true,'owners':true,'page':true,'pager':true,'pages':true,'panel':true,'password':true,'payment':true,'perl':true,'phone':true,'photo':true,'photoalbum':true,'photos':true,'php':true,'phpmyadmin':true,'phppgadmin':true,'phpredisadmin':true,'pic':true,'pics':true,'ping':true,'plan':true,'plans':true,'plugin':true,'plugins':true,'policy':true,'pop':true,'pop3':true,'popular':true,'portal':true,'post':true,'postfix':true,'postmaster':true,'posts':true,'pr':true,'premium':true,'press':true,'price':true,'pricing':true,'privacy':true,'privacy-policy':true,'privacy_policy':true,'privacypolicy':true,'private':true,'product':true,'products':true,'profile':true,'project':true,'projects':true,'promo':true,'pub':true,'public':true,'purpose':true,'put':true,'python':true,'query':true,'random':true,'ranking':true,'read':true,'readme':true,'recent':true,'recruit':true,'recruitment':true,'register':true,'registration':true,'release':true,'remove':true,'replies':true,'report':true,'reports':true,'repositories':true,'repository':true,'req':true,'request':true,'requests':true,'reset':true,'roc':true,'root':true,'rss':true,'ruby':true,'rule':true,'sag':true,'sale':true,'sales':true,'sample':true,'samples':true,'save':true,'school':true,'script':true,'scripts':true,'search':true,'secure':true,'security':true,'self':true,'send':true,'server':true,'server-info':true,'server-status':true,'service':true,'services':true,'session':true,'sessions':true,'setting':true,'settings':true,'setup':true,'share':true,'shop':true,'show':true,'sign-in':true,'sign-up':true,'sign_in':true,'sign_up':true,'signin':true,'signout':true,'signup':true,'site':true,'sitemap':true,'sites':true,'smartphone':true,'smtp':true,'soporte':true,'source':true,'spec':true,'special':true,'sql':true,'src':true,'ssh':true,'ssl':true,'ssladmin':true,'ssladministrator':true,'sslwebmaster':true,'staff':true,'stage':true,'staging':true,'start':true,'stat':true,'state':true,'static':true,'stats':true,'status':true,'store':true,'stores':true,'stories':true,'style':true,'styleguide':true,'stylesheet':true,'stylesheets':true,'subdomain':true,'subscribe':true,'subscriptions':true,'suporte':true,'support':true,'svn':true,'swf':true,'sys':true,'sysadmin':true,'sysadministrator':true,'system':true,'tablet':true,'tablets':true,'tag':true,'talk':true,'task':true,'tasks':true,'team':true,'teams':true,'tech':true,'telnet':true,'term':true,'terms':true,'terms-of-service':true,'terms_of_service':true,'termsofservice':true,'test':true,'test1':true,'test2':true,'test3':true,'teste':true,'testing':true,'tests':true,'theme':true,'themes':true,'thread':true,'threads':true,'tmp':true,'todo':true,'tool':true,'tools':true,'top':true,'topic':true,'topics':true,'tos':true,'tour':true,'translations':true,'trends':true,'tutorial':true,'tux':true,'tv':true,'twitter':true,'undef':true,'unfollow':true,'unsubscribe':true,'update':true,'upload':true,'uploads':true,'url':true,'usage':true,'user':true,'username':true,'users':true,'usuario':true,'vendas':true,'ver':true,'version':true,'video':true,'videos':true,'visitor':true,'watch':true,'weather':true,'web':true,'webhook':true,'webhooks':true,'webmail':true,'webmaster':true,'website':true,'websites':true,'welcome':true,'widget':true,'widgets':true,'wiki':true,'win':true,'windows':true,'word':true,'work':true,'works':true,'workshop':true,'ww':true,'wws':true,'www':true,'www1':true,'www2':true,'www3':true,'www4':true,'www5':true,'www6':true,'www7':true,'wwws':true,'wwww':true,'xfn':true,'xml':true,'xmpp':true,'xpg':true,'xxx':true,'yaml':true,'year':true,'yml':true,'you':true,'yourdomain':true,'yourname':true,'yoursite':true,'yourusername':true, 'trending': true},

};
