﻿namespace family_tree_API.Dto
{
    public class NodeDto
    {
        public double PosX { get; set; }

        public double PosY { get; set; }

        public Guid FamilyTree { get; set; }

        public Guid FamilyMember { get; set; }
    }
}
