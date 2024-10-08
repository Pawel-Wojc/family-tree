import { createAsyncThunk } from "@reduxjs/toolkit";
import { Tree } from "../../treeSlice.ts";

const exampleTree: Array<Tree> = [
    {
        id: "dsad",
        imgUrl: "https://static1.cbrimages.com/wordpress/wp-content/uploads/2022/04/spy-x-family-forger-family-is-a-great-family.jpg",
        name: "forger family",
    },
    {
        id: "dasdasd",
        imgUrl: "https://i.ytimg.com/vi/dyVQzu-uO8E/maxresdefault.jpg",
        name: "dobranocny ogród",
    },
];

export const fetchTrees = createAsyncThunk(
    "trees/fetchTrees",
    async () =>
        new Promise<Tree[]>((res, rej) => {
            console.log("thunk running");
            setTimeout(() => {
                // res(exampleTree);

                res(exampleTree);

                rej(new Error("test promise error"));
            }, 1000);
        })
);
