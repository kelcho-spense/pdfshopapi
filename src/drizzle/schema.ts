import { primaryKey, integer, pgTable, serial, text, varchar } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';


//Table schema for the users table
export const UsersTable = pgTable("users", {
    id: serial("id").primaryKey(), //primary key
    fullName: text("full_name"),
    phone: varchar("phone", { length: 256 }),
    address: varchar("address", { length: 256 }),
    score: integer("score"),
});
//Table schema for the profiles table
export const ProfilesTable = pgTable("profiles", {
    id: serial("id").primaryKey(),
    bio: varchar("bio", { length: 256 }),
    userId: integer("user_id").notNull().references(() => UsersTable.id, { onDelete: "cascade" }), //fk ref id in users table
});

//Table schema for posts table
export const PostsTable = pgTable("posts", {
    id: serial("id").primaryKey(),  //primary key
    text: varchar("text", { length: 256 }),
    authorId: integer("author_id")
        .notNull()
        .references(() => UsersTable.id),
});
// Table schema for categories table
export const CategoriesTable = pgTable("categories", {
    id: serial("id").primaryKey(), //primary key
    name: varchar("name", { length: 256 }),
});
// Table schema for post_categories table
export const PostOnCategoriesTable = pgTable("post_categories", { //junction table : post&categories
    postId: integer("post_id").notNull().references(() => PostsTable.id),  //fk ref id in posts table
    categoryId: integer("category_id").notNull().references(() => CategoriesTable.id),  //fk ref id in categories table
}, (t) => ({
    compositeKey: primaryKey(t.postId, t.categoryId),
})
);

//relationship : post (n) - (n) categories
export const CategoriesRelations = relations(CategoriesTable, ({ many }) => ({
    postCategories: many(PostOnCategoriesTable),
}));

//relationship : post (1) - (1) author[user]  post(n) - (n) post_category
export const postsRelations = relations(PostsTable, ({ one, many }) => ({
    author: one(UsersTable, {
        fields: [PostsTable.authorId],
        references: [UsersTable.id]
    }),
    postCategories: many(PostOnCategoriesTable)
}))
//relationship :  post_category (1) - (n) category && post_category (1) - (n) post
export const postCategoriesRelations = relations(PostOnCategoriesTable, ({ one }) => ({
    post: one(PostsTable, {
        fields: [PostOnCategoriesTable.postId],
        references: [PostsTable.id],
    }),
    category: one(CategoriesTable, {
        fields: [PostOnCategoriesTable.categoryId],
        references: [CategoriesTable.id],
    }),
}))
//relationship : user (1) - (1) profile & user(1) - (n) posts
export const usersRelations = relations(UsersTable, ({ one, many }) => ({  //1st table : where the relation is defined  
    profile: one(ProfilesTable, {   // 2nd table
        fields: [UsersTable.id],  //pk id in users table
        references: [ProfilesTable.userId]  //fk ref id in profiles table
    }),
    post: many(PostsTable)
}));

//select & insert schema types
export type  iUserSchema =  typeof UsersTable.$inferInsert;
export type sUserSchema = typeof UsersTable.$inferSelect;


 //zod schemas
//  inserting a user
 export const insertUserSchema = createInsertSchema(UsersTable);

 //common interface types
export interface returnIdObject {
    id: number;
}
















//Data Types Table
// export const moodEnum = pgEnum("mood", ["sad", "ok", "happy"]);
// export const testTable = pgTable("testTable", {
//     id: bigserial("id", { mode: "bigint" }).primaryKey(),
//     qty: bigint("qty", { mode: "bigint" }),
//     price: numeric("price", { precision: 7, scale: 2 }), // 12345.67
//     score: doublePrecision("score"),
//     delivered: boolean("delivered"),
//     // description: text("description"),
//     description: varchar("description", { length: 256 }),
//     name: char("name", { length: 10 }), // "chair     "
//     data: jsonb("data"),
//     startAt: time("startAt", { withTimezone: false }).defaultNow(),
//     date: interval("date"),
//     mood: moodEnum("mood").default("ok"),
// });