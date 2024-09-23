import React from "react";

import CloseIcon from "./../../assets/close.svg?react";

export const Eula: React.FC<{ close: () => void }> = ({ close }) => {
    return (
        <div className="modal relative">
            <CloseIcon
                className="absolute right-1 top-[-2rem] fill-orange cursor-pointer z-[1000000]"
                onClick={() => close()}
            />
            <h1 className="title w-full text-center mb-5">
                End-User License Agreement
            </h1>
            <div className="flex flex-col items-center justify-between max-h-[60vh] overflow-y-scroll py-10">
                <p className="px-8">
                    <span className="pb-4">
                        This End-User License Agreement ("Agreement") is a legal
                        agreement between you and the FamilyTree application
                        ("Application"). By using the Application, you agree to
                        be bound by the terms and conditions of this Agreement.
                    </span>
                    <ol>
                        <li>
                            <h2 className="title pt-4 !text-2xl">
                                1. User Consent:
                            </h2>
                            <p>
                                All members of the FamilyTree application,
                                including the user, must adhere to the following
                                principles: Before submitting personal
                                information to the family tree, members must
                                obtain consent from living family members. If
                                members post content without such consent, the
                                Registered User will be held responsible.
                            </p>
                        </li>
                        <li>
                            <h2 className="title pt-4 !text-2xl">
                                2. User Responsibilities:
                            </h2>
                            <p>
                                Users are responsible for obtaining proper
                                authorization before sharing personal
                                information on the family tree. The Application
                                is not liable for any content posted without
                                proper consent.
                            </p>
                        </li>
                        <li>
                            <h2 className="title pt-4 !text-2xl">
                                3. Privacy and Confidentiality:
                            </h2>
                            <p>
                                Users must respect the privacy and
                                confidentiality of living family members. Do not
                                disclose sensitive information without proper
                                authorization.
                            </p>
                        </li>
                        <li>
                            <h2 className="title pt-4 !text-2xl">
                                4. Compliance with Laws:
                            </h2>
                            <p>
                                Users must comply with all applicable laws and
                                regulations when using the Application.
                            </p>
                        </li>
                        <li>
                            <h2 className="title pt-4 !text-2xl">
                                5. Limitation of Liability:
                            </h2>
                            <p>
                                The Application is not responsible for any
                                unauthorized or unlawful use of information
                                posted on the family tree.
                            </p>
                        </li>
                        <li>
                            <h2 className="title pt-4 !text-2xl">
                                6. Termination:
                            </h2>
                            <p>
                                This Agreement is effective until terminated by
                                the user or the Application. The Application
                                reserves the right to terminate or suspend
                                access to the family tree for users who violate
                                this Agreement.
                            </p>
                        </li>
                        <li>
                            <h2 className="title pt-4 !text-2xl">
                                7. Governing Law:
                            </h2>
                            <p>
                                This Agreement shall be governed by and
                                construed in accordance with the laws of Poland.
                            </p>
                        </li>
                    </ol>
                    <span className="pt-2">
                        By using the FamilyTree application, you acknowledge
                        that you have read, understood, and agree to be bound by
                        the terms of this Agreement. Students 29.01.2024
                    </span>
                </p>
            </div>
        </div>
    );
};
