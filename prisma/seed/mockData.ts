import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const splitSql = (sql: string) => {
  return sql.split(';').filter(content => content.trim() !== '')
}

async function main() {
  const sql = `

INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "emailVerified", "status", "globalRole", "password") VALUES ('e26353d4-5a83-4704-98aa-186c5cbbb1aa', '1Janice.Oberbrunner@gmail.com', 'Jane Smith', 'https://i.imgur.com/YfJQV5z.png?id=3', 'abc123def456', false, 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "emailVerified", "status", "globalRole", "password") VALUES ('cf52f595-ac87-4f3a-ad9e-a936dbf0a115', '10Jaeden.Sawayn3@gmail.com', 'Alice Wonderland', 'https://i.imgur.com/YfJQV5z.png?id=12', 'yz567abc890', false, 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "emailVerified", "status", "globalRole", "password") VALUES ('ba37e3ea-a986-4f59-be2b-07f1619e7b5f', '19Kyra_Quitzon50@yahoo.com', 'John Doe', 'https://i.imgur.com/YfJQV5z.png?id=21', 'stu901vwx234', true, 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "emailVerified", "status", "globalRole", "password") VALUES ('62d2f5eb-bb9b-4f12-aa06-fbaac94b9793', '37Anissa_Cremin@hotmail.com', 'John Doe', 'https://i.imgur.com/YfJQV5z.png?id=39', 'abc123def456', false, 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "emailVerified", "status", "globalRole", "password") VALUES ('b84365f7-9c54-4668-8beb-69f0f5304e07', '46Laisha28@yahoo.com', 'Jane Smith', 'https://i.imgur.com/YfJQV5z.png?id=48', 'mno345pqr678', false, 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "emailVerified", "status", "globalRole", "password") VALUES ('e53ceef1-4b42-43ec-b4a9-fb4a5d135fa9', '55Nola39@gmail.com', 'Charlie Brown', 'https://i.imgur.com/YfJQV5z.png?id=57', 'ghi789jkl012', false, 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "emailVerified", "status", "globalRole", "password") VALUES ('fdcbcb5c-e5b2-4fab-ad72-2f584aee1319', '64Bernice_Jakubowski@gmail.com', 'Alice Wonderland', 'https://i.imgur.com/YfJQV5z.png?id=66', 'stu901vwx234', true, 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "emailVerified", "status", "globalRole", "password") VALUES ('7ad645c6-ab64-49c3-9b33-9f1a850ca195', '73Fred1@yahoo.com', 'Alice Wonderland', 'https://i.imgur.com/YfJQV5z.png?id=75', 'yz567abc890', true, 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "emailVerified", "status", "globalRole", "password") VALUES ('5240e19e-3857-478d-9901-7447aedbb396', '82Jacques.McLaughlin35@gmail.com', 'Alice Wonderland', 'https://i.imgur.com/YfJQV5z.png?id=84', 'ghi789jkl012', false, 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');

INSERT INTO "Template" ("id", "name", "type", "description", "settings") VALUES ('6479de55-4da8-4f3a-9201-14e168ac0f3f', 'Vintage Portrait', 'Article', 'A comprehensive guide for travelers exploring new destinations.', '{"magnam":"quidem","apostolus":"temperantia","amaritudo":"tutamen","consectetur":"trucido","paens":"sustineo"}'::jsonb);
INSERT INTO "Template" ("id", "name", "type", "description", "settings") VALUES ('b9b84f7e-7204-4c4b-a35d-50a2174e39aa', 'Modern Abstract', 'Image', 'A comprehensive guide for travelers exploring new destinations.', '{"ventito":"cogo","blanditiis":"stella","subiungo":"strues"}'::jsonb);
INSERT INTO "Template" ("id", "name", "type", "description", "settings") VALUES ('e079d9be-7450-4637-9206-8872bb6feca6', 'Travel Guide', 'Image', 'A comprehensive guide for travelers exploring new destinations.', '{"careo":"universe","arguo":"sufficio","tergum":"corpus"}'::jsonb);
INSERT INTO "Template" ("id", "name", "type", "description", "settings") VALUES ('c8862f65-4229-49db-81b9-7b4a30d6cbbc', 'Vintage Portrait', 'Image', 'An abstract representation with a contemporary flair.', '{"currus":"verus","adeo":"taceo","alioqui":"natus"}'::jsonb);
INSERT INTO "Template" ("id", "name", "type", "description", "settings") VALUES ('3799ad80-dd1f-4579-9996-4f9a265b377a', 'Vintage Portrait', 'Image', 'An informative piece on the latest technology trends.', '{"nemo":"dedico","causa":"voco","cauda":"voluptatum","corona":"suscipit","coepi":"textus"}'::jsonb);
INSERT INTO "Template" ("id", "name", "type", "description", "settings") VALUES ('da30d9aa-6809-4bce-8b4d-ddd9fa2019c5', 'Travel Guide', 'Article', 'An informative piece on the latest technology trends.', '{"virtus":"viscus","concido":"fugiat","uxor":"dicta","reiciendis":"admoveo","titulus":"explicabo"}'::jsonb);
INSERT INTO "Template" ("id", "name", "type", "description", "settings") VALUES ('328e6980-c7f1-4611-852f-e74926ccc376', 'Artistic Landscape', 'Image', 'A vibrant depiction of natural scenery.', '{"illo":"auctor","velit":"esse","textus":"comprehendo","ea":"ab","aliquid":"vapulus"}'::jsonb);
INSERT INTO "Template" ("id", "name", "type", "description", "settings") VALUES ('5b5b2466-ae0e-4218-9fd8-6a1b796c1bbe', 'Travel Guide', 'Image', 'A comprehensive guide for travelers exploring new destinations.', '{"adeo":"testimonium","vinco":"adaugeo","cultura":"alius","voluptate":"cuppedia","conforto":"casso"}'::jsonb);
INSERT INTO "Template" ("id", "name", "type", "description", "settings") VALUES ('b0676ebf-4a4f-4fcd-bd61-fd04994ab316', 'Modern Abstract', 'Article', 'A classic style portrait with a vintage touch.', '{"utilis":"arbor","adfectus":"demo","aperio":"creber"}'::jsonb);
INSERT INTO "Template" ("id", "name", "type", "description", "settings") VALUES ('e132145d-1fbc-4556-8896-1718540cf43a', 'Modern Abstract', 'Image', 'A comprehensive guide for travelers exploring new destinations.', '{"tonsor":"caute","utrum":"calco","vereor":"voluptate","teres":"territo","vobis":"esse"}'::jsonb);

INSERT INTO "Image" ("id", "prompt", "style", "theme", "imageUrl", "status", "userId") VALUES ('88a0c9f0-5f9c-4681-931c-335b55b962bc', 'A bustling market scene in a medieval village', 'Cartoon', 'Urban', 'https://i.imgur.com/YfJQV5z.png?id=144', 'In Progress', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc');
INSERT INTO "Image" ("id", "prompt", "style", "theme", "imageUrl", "status", "userId") VALUES ('80f56f52-9250-4395-aa73-b9cd3a0dabd6', 'A bustling market scene in a medieval village', 'Surreal', 'Adventure', 'https://i.imgur.com/YfJQV5z.png?id=150', 'In Progress', '62d2f5eb-bb9b-4f12-aa06-fbaac94b9793');
INSERT INTO "Image" ("id", "prompt", "style", "theme", "imageUrl", "status", "userId") VALUES ('67fb2135-60e2-4f0a-a149-ac4c63036379', 'A vibrant underwater coral reef', 'Cartoon', 'Mystery', 'https://i.imgur.com/YfJQV5z.png?id=156', 'In Progress', 'fdcbcb5c-e5b2-4fab-ad72-2f584aee1319');
INSERT INTO "Image" ("id", "prompt", "style", "theme", "imageUrl", "status", "userId") VALUES ('e8bb4d39-7f91-4349-b64a-9da2a549b2ab', 'A futuristic cityscape at sunset', 'Surreal', 'Nature', 'https://i.imgur.com/YfJQV5z.png?id=162', 'In Progress', 'fdcbcb5c-e5b2-4fab-ad72-2f584aee1319');
INSERT INTO "Image" ("id", "prompt", "style", "theme", "imageUrl", "status", "userId") VALUES ('5c3ce327-7ea2-4859-b813-33f48e469488', 'A futuristic cityscape at sunset', 'Surreal', 'Urban', 'https://i.imgur.com/YfJQV5z.png?id=168', 'Completed', 'e26353d4-5a83-4704-98aa-186c5cbbb1aa');
INSERT INTO "Image" ("id", "prompt", "style", "theme", "imageUrl", "status", "userId") VALUES ('1be54470-544d-428c-954c-d6fd3ffa283d', 'A cozy reading nook with a cat', 'Surreal', 'Nature', 'https://i.imgur.com/YfJQV5z.png?id=174', 'Pending', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc');
INSERT INTO "Image" ("id", "prompt", "style", "theme", "imageUrl", "status", "userId") VALUES ('a355348a-7e3c-4b56-bc4f-20d97124c2d4', 'A cozy reading nook with a cat', 'Surreal', 'Mystery', 'https://i.imgur.com/YfJQV5z.png?id=180', 'Queued', 'ba37e3ea-a986-4f59-be2b-07f1619e7b5f');
INSERT INTO "Image" ("id", "prompt", "style", "theme", "imageUrl", "status", "userId") VALUES ('42f762a2-957c-4cfa-96a3-73bbca210060', 'A serene landscape with mountains and a lake', 'Cartoon', 'Mystery', 'https://i.imgur.com/YfJQV5z.png?id=186', 'In Progress', '62d2f5eb-bb9b-4f12-aa06-fbaac94b9793');
INSERT INTO "Image" ("id", "prompt", "style", "theme", "imageUrl", "status", "userId") VALUES ('8579c78e-b1d8-431d-9703-284550716b70', 'A serene landscape with mountains and a lake', 'Surreal', 'Mystery', 'https://i.imgur.com/YfJQV5z.png?id=192', 'Pending', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc');
INSERT INTO "Image" ("id", "prompt", "style", "theme", "imageUrl", "status", "userId") VALUES ('5b891319-3531-4c86-b627-f7e0951dd5b6', 'A futuristic cityscape at sunset', 'Impressionist', 'Adventure', 'https://i.imgur.com/YfJQV5z.png?id=198', 'In Progress', 'ba37e3ea-a986-4f59-be2b-07f1619e7b5f');

INSERT INTO "Article" ("id", "title", "topic", "keywords", "content", "length", "tone", "status", "userId") VALUES ('ebd19d0b-be19-477b-8f14-712dc101c0ea', 'The Impact of AI on Content Creation', 'Technology Trends', 'AI marketing future', 'Creating engaging blog posts requires a blend of creativity and strategy...', 18, 'informative', 'draft', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc');
INSERT INTO "Article" ("id", "title", "topic", "keywords", "content", "length", "tone", "status", "userId") VALUES ('f1f268d9-aa3e-4b5e-a011-6d9e6fc229bd', 'The Impact of AI on Content Creation', 'Search Engine Optimization', 'digital art illustration creativity', 'AI is revolutionizing the way content is created and consumed...', 839, 'professional', 'archived', '62d2f5eb-bb9b-4f12-aa06-fbaac94b9793');
INSERT INTO "Article" ("id", "title", "topic", "keywords", "content", "length", "tone", "status", "userId") VALUES ('f0118fcc-94bb-469e-87c0-d6452ef16852', 'Exploring the Art of Digital Illustration', 'Artificial Intelligence', 'digital art illustration creativity', 'Creating engaging blog posts requires a blend of creativity and strategy...', 279, 'professional', 'under review', '5240e19e-3857-478d-9901-7447aedbb396');
INSERT INTO "Article" ("id", "title", "topic", "keywords", "content", "length", "tone", "status", "userId") VALUES ('b9780a5f-5ef4-4c89-8c35-54ffe5c3f1c7', 'The Impact of AI on Content Creation', 'Artificial Intelligence', 'AI content creation impact', 'Creating engaging blog posts requires a blend of creativity and strategy...', 821, 'professional', 'published', 'ba37e3ea-a986-4f59-be2b-07f1619e7b5f');
INSERT INTO "Article" ("id", "title", "topic", "keywords", "content", "length", "tone", "status", "userId") VALUES ('f461993b-b71b-450b-af83-d9228f7b6701', 'The Impact of AI on Content Creation', 'Digital Art', 'digital art illustration creativity', 'Artificial intelligence is transforming the marketing landscape...', 772, 'informative', 'draft', 'ba37e3ea-a986-4f59-be2b-07f1619e7b5f');
INSERT INTO "Article" ("id", "title", "topic", "keywords", "content", "length", "tone", "status", "userId") VALUES ('1a0f76d5-e807-4a30-bca3-310a7ecb08de', 'The Impact of AI on Content Creation', 'Digital Art', 'AI marketing future', 'Small businesses can benefit greatly from effective SEO strategies...', 726, 'informative', 'published', 'b84365f7-9c54-4668-8beb-69f0f5304e07');
INSERT INTO "Article" ("id", "title", "topic", "keywords", "content", "length", "tone", "status", "userId") VALUES ('8db39982-294b-4b41-b701-82ce5b031886', 'Exploring the Art of Digital Illustration', 'Content Marketing', 'SEO small business strategies', 'AI is revolutionizing the way content is created and consumed...', 358, 'professional', 'draft', 'fdcbcb5c-e5b2-4fab-ad72-2f584aee1319');
INSERT INTO "Article" ("id", "title", "topic", "keywords", "content", "length", "tone", "status", "userId") VALUES ('ab4c50d9-24a9-4c57-8df2-b69da81c243a', 'Exploring the Art of Digital Illustration', 'Technology Trends', 'digital art illustration creativity', 'Small businesses can benefit greatly from effective SEO strategies...', 531, 'informative', 'under review', '7ad645c6-ab64-49c3-9b33-9f1a850ca195');
INSERT INTO "Article" ("id", "title", "topic", "keywords", "content", "length", "tone", "status", "userId") VALUES ('6f26f722-41e7-422b-b0c4-4204438cd478', 'Exploring the Art of Digital Illustration', 'Technology Trends', 'SEO small business strategies', 'Digital illustration is an exciting field that combines art and technology...', 548, 'informative', 'under review', 'cf52f595-ac87-4f3a-ad9e-a936dbf0a115');
INSERT INTO "Article" ("id", "title", "topic", "keywords", "content", "length", "tone", "status", "userId") VALUES ('ea25ecbb-5dc5-4a3c-93a3-e0a7081bc0ad', 'SEO Strategies for Small Businesses', 'Search Engine Optimization', 'SEO small business strategies', 'Artificial intelligence is transforming the marketing landscape...', 521, 'persuasive', 'draft', 'e53ceef1-4b42-43ec-b4a9-fb4a5d135fa9');

INSERT INTO "Download" ("id", "resourceId", "resourceType", "format", "downloadUrl", "userId") VALUES ('01dc6e58-4889-4193-8956-36101215ec0b', '885f7dbe-4a61-449d-aa07-94ff6edc4a74', 'article', 'docx', 'https://i.imgur.com/YfJQV5z.png?id=284', '7ad645c6-ab64-49c3-9b33-9f1a850ca195');
INSERT INTO "Download" ("id", "resourceId", "resourceType", "format", "downloadUrl", "userId") VALUES ('36339c39-8867-4be5-b6bd-37adcc420bcc', '39339f30-0ed9-44c4-8f62-77d155ffbf46', 'infographic', 'docx', 'https://i.imgur.com/YfJQV5z.png?id=289', 'b84365f7-9c54-4668-8beb-69f0f5304e07');
INSERT INTO "Download" ("id", "resourceId", "resourceType", "format", "downloadUrl", "userId") VALUES ('b5153b47-0280-45cf-9cac-356892e58c8f', '83d13ae1-8f26-4c6c-b928-590483ef4935', 'graphic', 'png', 'https://i.imgur.com/YfJQV5z.png?id=294', '7ad645c6-ab64-49c3-9b33-9f1a850ca195');
INSERT INTO "Download" ("id", "resourceId", "resourceType", "format", "downloadUrl", "userId") VALUES ('3b4c6be2-e660-473c-9034-0a23b73cea69', '313073d3-7f9b-4808-868a-ff9ead22ce99', 'graphic', 'docx', 'https://i.imgur.com/YfJQV5z.png?id=299', 'e53ceef1-4b42-43ec-b4a9-fb4a5d135fa9');
INSERT INTO "Download" ("id", "resourceId", "resourceType", "format", "downloadUrl", "userId") VALUES ('7bceeb9a-b1ef-4a81-ba57-bb5132050aef', '20db1ab5-1115-4f67-8fec-c2174b610d81', 'blogPost', 'docx', 'https://i.imgur.com/YfJQV5z.png?id=304', 'e26353d4-5a83-4704-98aa-186c5cbbb1aa');
INSERT INTO "Download" ("id", "resourceId", "resourceType", "format", "downloadUrl", "userId") VALUES ('e1102ddf-2477-4dee-a6d6-04bd062d93c0', '9db05a8d-1fcf-4e33-b816-125cc916088e', 'image', 'jpg', 'https://i.imgur.com/YfJQV5z.png?id=309', '7ad645c6-ab64-49c3-9b33-9f1a850ca195');
INSERT INTO "Download" ("id", "resourceId", "resourceType", "format", "downloadUrl", "userId") VALUES ('256f93c3-dde9-4099-8c21-3bdafc89ea8a', '93ea113d-cce4-49b7-9af2-79bbb94f787e', 'blogPost', 'docx', 'https://i.imgur.com/YfJQV5z.png?id=314', 'ba37e3ea-a986-4f59-be2b-07f1619e7b5f');
INSERT INTO "Download" ("id", "resourceId", "resourceType", "format", "downloadUrl", "userId") VALUES ('a17a0d53-5cf2-43ea-9849-0e0e6f0ee55f', 'f4ac0d53-2a39-4f7c-be15-ef779ec56b88', 'image', 'pdf', 'https://i.imgur.com/YfJQV5z.png?id=319', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc');
INSERT INTO "Download" ("id", "resourceId", "resourceType", "format", "downloadUrl", "userId") VALUES ('3abbea44-e690-4970-9095-a82e788288d5', 'c094de86-056e-4331-80fd-3cbd9e13ebdd', 'article', 'html', 'https://i.imgur.com/YfJQV5z.png?id=324', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc');
INSERT INTO "Download" ("id", "resourceId", "resourceType", "format", "downloadUrl", "userId") VALUES ('228caa19-8409-48a0-a192-09fc34cf6639', 'e2fb0608-5421-4a20-a2d6-9f0245c17d0f', 'blogPost', 'jpg', 'https://i.imgur.com/YfJQV5z.png?id=329', 'b84365f7-9c54-4668-8beb-69f0f5304e07');

  `

  const sqls = splitSql(sql)

  for (const sql of sqls) {
    try {
      await prisma.$executeRawUnsafe(`${sql}`)
    } catch (error) {
      console.log(`Could not insert SQL: ${error.message}`)
    }
  }
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async error => {
    console.error(error)
    await prisma.$disconnect()
    process.exit(1)
  })
