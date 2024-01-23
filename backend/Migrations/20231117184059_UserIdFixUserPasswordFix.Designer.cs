﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;
using family_tree_API.Models;

#nullable disable

namespace family_tree_API.Migrations
{
    [DbContext(typeof(FamilyTreeContext))]
    [Migration("20231117184059_UserIdFixUserPasswordFix")]
    partial class UserIdFixUserPasswordFix
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.13")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

            modelBuilder.Entity("family_tree_API.Models.Connection", b =>
                {
                    b.Property<Guid>("Id")
                        .HasColumnType("uuid")
                        .HasColumnName("id");

                    b.Property<Guid>("FamilyTreeId")
                        .HasColumnType("uuid")
                        .HasColumnName("family_tree_id");

                    b.Property<Guid>("From")
                        .HasColumnType("uuid")
                        .HasColumnName("from");

                    b.Property<Guid>("To")
                        .HasColumnType("uuid")
                        .HasColumnName("to");

                    b.HasKey("Id")
                        .HasName("connections_pkey");

                    b.HasIndex("FamilyTreeId");

                    b.HasIndex("From");

                    b.HasIndex("To");

                    b.ToTable("connections", (string)null);
                });

            modelBuilder.Entity("family_tree_API.Models.FamilyMember", b =>
                {
                    b.Property<Guid>("Id")
                        .HasColumnType("uuid")
                        .HasColumnName("id");

                    b.Property<string>("AdditionalData")
                        .HasMaxLength(500)
                        .HasColumnType("character varying(500)")
                        .HasColumnName("additional_data");

                    b.Property<DateOnly?>("BirthDate")
                        .HasColumnType("date")
                        .HasColumnName("birth_date");

                    b.Property<DateOnly?>("DeathDate")
                        .HasColumnType("date")
                        .HasColumnName("death_date");

                    b.Property<string>("ImgUrl")
                        .HasMaxLength(100)
                        .HasColumnType("character varying(100)")
                        .HasColumnName("img_url");

                    b.Property<string>("Name")
                        .HasMaxLength(50)
                        .HasColumnType("character varying(50)")
                        .HasColumnName("name");

                    b.Property<string>("Surname")
                        .HasMaxLength(50)
                        .HasColumnType("character varying(50)")
                        .HasColumnName("surname");

                    b.Property<Guid>("UserId")
                        .HasColumnType("uuid")
                        .HasColumnName("user_id");

                    b.HasKey("Id")
                        .HasName("family_members_pkey");

                    b.HasIndex("UserId");

                    b.ToTable("family_members", (string)null);
                });

            modelBuilder.Entity("family_tree_API.Models.FamilyTree", b =>
                {
                    b.Property<Guid>("Id")
                        .HasColumnType("uuid")
                        .HasColumnName("id");

                    b.Property<string>("ImgUrl")
                        .HasMaxLength(100)
                        .HasColumnType("character varying(100)")
                        .HasColumnName("img_url");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("character varying(100)")
                        .HasColumnName("name");

                    b.Property<Guid>("UserId")
                        .HasColumnType("uuid")
                        .HasColumnName("user_id");

                    b.HasKey("Id")
                        .HasName("family_trees_pkey");

                    b.HasIndex("UserId");

                    b.ToTable("family_trees", (string)null);
                });

            modelBuilder.Entity("family_tree_API.Models.Node", b =>
                {
                    b.Property<Guid>("Id")
                        .HasColumnType("uuid")
                        .HasColumnName("id");

                    b.Property<Guid>("FamilyMember")
                        .HasColumnType("uuid")
                        .HasColumnName("family_member");

                    b.Property<Guid>("FamilyTree")
                        .HasColumnType("uuid")
                        .HasColumnName("family_tree");

                    b.Property<double>("PosX")
                        .HasColumnType("double precision")
                        .HasColumnName("pos_x");

                    b.Property<double>("PosY")
                        .HasColumnType("double precision")
                        .HasColumnName("pos_y");

                    b.HasKey("Id")
                        .HasName("nodes_pkey");

                    b.HasIndex("FamilyMember");

                    b.HasIndex("FamilyTree");

                    b.ToTable("nodes", (string)null);
                });

            modelBuilder.Entity("family_tree_API.Models.User", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid")
                        .HasColumnName("id");

                    b.Property<string>("EMail")
                        .IsRequired()
                        .HasMaxLength(40)
                        .HasColumnType("character varying(40)")
                        .HasColumnName("e-mail");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(40)
                        .HasColumnType("character varying(40)")
                        .HasColumnName("name");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasMaxLength(256)
                        .HasColumnType("character varying(256)")
                        .HasColumnName("password");

                    b.HasKey("Id")
                        .HasName("users_pkey");

                    b.ToTable("users", (string)null);
                });

            modelBuilder.Entity("family_tree_API.Models.Connection", b =>
                {
                    b.HasOne("family_tree_API.Models.FamilyTree", "FamilyTree")
                        .WithMany("Connections")
                        .HasForeignKey("FamilyTreeId")
                        .IsRequired()
                        .HasConstraintName("tree");

                    b.HasOne("family_tree_API.Models.Node", "FromNavigation")
                        .WithMany("ConnectionFromNavigations")
                        .HasForeignKey("From")
                        .IsRequired()
                        .HasConstraintName("from");

                    b.HasOne("family_tree_API.Models.Node", "ToNavigation")
                        .WithMany("ConnectionToNavigations")
                        .HasForeignKey("To")
                        .IsRequired()
                        .HasConstraintName("to");

                    b.Navigation("FamilyTree");

                    b.Navigation("FromNavigation");

                    b.Navigation("ToNavigation");
                });

            modelBuilder.Entity("family_tree_API.Models.FamilyMember", b =>
                {
                    b.HasOne("family_tree_API.Models.User", "User")
                        .WithMany("FamilyMembers")
                        .HasForeignKey("UserId")
                        .IsRequired()
                        .HasConstraintName("user");

                    b.Navigation("User");
                });

            modelBuilder.Entity("family_tree_API.Models.FamilyTree", b =>
                {
                    b.HasOne("family_tree_API.Models.User", "User")
                        .WithMany("FamilyTrees")
                        .HasForeignKey("UserId")
                        .IsRequired()
                        .HasConstraintName("users");

                    b.Navigation("User");
                });

            modelBuilder.Entity("family_tree_API.Models.Node", b =>
                {
                    b.HasOne("family_tree_API.Models.FamilyMember", "FamilyMemberNavigation")
                        .WithMany("Nodes")
                        .HasForeignKey("FamilyMember")
                        .IsRequired()
                        .HasConstraintName("member");

                    b.HasOne("family_tree_API.Models.FamilyTree", "FamilyTreeNavigation")
                        .WithMany("Nodes")
                        .HasForeignKey("FamilyTree")
                        .IsRequired()
                        .HasConstraintName("tree");

                    b.Navigation("FamilyMemberNavigation");

                    b.Navigation("FamilyTreeNavigation");
                });

            modelBuilder.Entity("family_tree_API.Models.FamilyMember", b =>
                {
                    b.Navigation("Nodes");
                });

            modelBuilder.Entity("family_tree_API.Models.FamilyTree", b =>
                {
                    b.Navigation("Connections");

                    b.Navigation("Nodes");
                });

            modelBuilder.Entity("family_tree_API.Models.Node", b =>
                {
                    b.Navigation("ConnectionFromNavigations");

                    b.Navigation("ConnectionToNavigations");
                });

            modelBuilder.Entity("family_tree_API.Models.User", b =>
                {
                    b.Navigation("FamilyMembers");

                    b.Navigation("FamilyTrees");
                });
#pragma warning restore 612, 618
        }
    }
}
