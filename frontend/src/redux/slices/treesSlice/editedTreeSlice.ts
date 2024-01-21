import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Id, toast } from "react-toastify";
import { Tree } from "./treeSlice.ts";
import { fetchEditerTreeData } from "./cases/tests/fetchEditTreeData.ts";
import { updateFamilyMemberData } from "./cases/tests/updateFamilyMemberData.ts";
import { createFamilyMember } from "./cases/tests/craeteFamilyMember.ts";
import { createNewNode } from "./cases/tests/createNewNode.ts";

enum status {
    pending,
    loading,
    loaded,
    error,
}

export interface FamilyMember {
    id: number;
    name: string;
    status: string;
    deathTime: Date | null;
    address: string;
    additionalData?: string;
    img_url?: string;
}

export interface NodeConnection {
    id: number;
    famTreeNumber: number;
    from: number;
    to: number;
}

export interface Node {
    id: number;
    posX: number;
    posY: number;
    famMemId: number | null;
}

export enum MouseMode {
    None,
    Create,
    Link,
    RmLink,
    Delete,
}

export interface EditedTree {
    tree: Tree | null;
    status: status;
    members: Array<FamilyMember>;
    nodes: Array<Node>;
    connections: Array<NodeConnection>;
    toastId?: Id;
    MouseMode: MouseMode;
}

// Define the initial state using that type
const initialState: EditedTree = {
    tree: null,
    status: status.pending,
    members: [],
    nodes: [],
    connections: [],
    toastId: "getEfitedTree",
    MouseMode: MouseMode.None,
};

export const treesSlice = createSlice({
    name: "familyTrees",
    initialState,
    reducers: {
        // incrementByAmount: (state, action: PayloadAction<number>) => {
        //     state.value += action.payload;
        // },
        setMouseMode: (state, action: PayloadAction<MouseMode>) => {
            console.log("changing mouse mode: ", action.payload);
            state.MouseMode = action.payload;
        },
    },
    extraReducers: (builder) => {
        // ---------------------
        // Fetch edited Tree
        // ---------------------
        builder.addCase(fetchEditerTreeData.pending, (state) => {
            console.log("pending trees from thunk");
            state.toastId = toast.loading("fetching Tree Data to Edit", {
                autoClose: 5000,
                closeButton: true,
                closeOnClick: true,
                toastId: "getEfitedTree",
            });
            state.status = status.loading;
        });
        builder.addCase(fetchEditerTreeData.fulfilled, (state, action) => {
            const newState = {
                ...state,
                status: status.loaded,
                ...action.payload,
            };
            if (state.toastId)
                toast.update(state.toastId, {
                    render: "fetched tree",
                    type: "success",
                    isLoading: false,
                    autoClose: 2000,
                });
            return newState;
        });
        builder.addCase(fetchEditerTreeData.rejected, (state, payload) => {
            if (state && state.toastId)
                toast.update(state.toastId, {
                    render: "failed to get given tree",
                    type: "error",
                    isLoading: false,
                    autoClose: 2000,
                });
            console.error(`${payload.error.code}: ${payload.error.message}`);
        });

        // ---------------------
        // Update Family Member
        // ---------------------
        builder.addCase(updateFamilyMemberData.pending, (state) => {
            console.log("pending updating family member from thunk");
            state.toastId = toast.loading("Updating Family member", {
                autoClose: 5000,
                closeButton: true,
                closeOnClick: true,
                toastId: "UpdateFamMember",
            });
            state.status = status.loading;
        });
        builder.addCase(updateFamilyMemberData.fulfilled, (state, action) => {
            const newMembers = state.members.map((mem) =>
                mem.id !== action.payload.id ? mem : action.payload
            );
            if (state.toastId)
                toast.update(state.toastId, {
                    render: "updates member successfully",
                    type: "success",
                    isLoading: false,
                    autoClose: 2000,
                });
            return { ...state, members: newMembers };
        });
        builder.addCase(updateFamilyMemberData.rejected, (state, payload) => {
            if (state && state.toastId)
                toast.update(state.toastId, {
                    render: "failed to update member",
                    type: "error",
                    isLoading: false,
                    autoClose: 2000,
                });
            console.error(`${payload.error.code}: ${payload.error.message}`);
        });

        // ---------------------
        // Create Family Member
        // ---------------------
        builder.addCase(createFamilyMember.pending, (state) => {
            state.toastId = toast.loading("creating Family member", {
                autoClose: 5000,
                closeButton: true,
                closeOnClick: true,
                toastId: "UpdateFamMember",
            });
            state.status = status.loading;
        });
        builder.addCase(createFamilyMember.fulfilled, (state, action) => {
            if (state.toastId)
                toast.update(state.toastId, {
                    render: "created member successfully",
                    type: "success",
                    isLoading: false,
                    autoClose: 2000,
                });
            return { ...state, members: [...state.members, action.payload] };
        });
        builder.addCase(createFamilyMember.rejected, (state, payload) => {
            if (state && state.toastId)
                toast.update(state.toastId, {
                    render: "failed to create member",
                    type: "error",
                    isLoading: false,
                    autoClose: 2000,
                });
            console.error(`${payload.error.code}: ${payload.error.message}`);
        });

        // ---------------------
        // Create new Node
        // ---------------------
        builder.addCase(createNewNode.pending, (state) => {
            state.toastId = toast.loading("craeting new node", {
                autoClose: 5000,
                closeButton: true,
                closeOnClick: true,
                toastId: "createNode",
            });
            state.status = status.loading;
        });
        builder.addCase(createNewNode.fulfilled, (state, action) => {
            if (state.toastId)
                toast.update(state.toastId, {
                    render: "created new node successfully",
                    type: "success",
                    isLoading: false,
                    autoClose: 2000,
                });
            return { ...state, nodes: [...state.nodes, action.payload] };
        });
        builder.addCase(createNewNode.rejected, (state, payload) => {
            if (state && state.toastId)
                toast.update(state.toastId, {
                    render: "failed to create new node",
                    type: "error",
                    isLoading: false,
                    autoClose: 2000,
                });
            console.error(`${payload.error.code}: ${payload.error.message}`);
        });
    },
});

export const { setMouseMode } = treesSlice.actions;

export default treesSlice.reducer;
