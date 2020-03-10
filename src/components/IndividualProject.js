import React, { useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { firebase } from "../firebase";
import { useProjectsValue, useSelectedProjectValue } from "../context";

export const IndividualProject = ({project}) => {

    const [showConfirm, setShowConfirm] = useState(false);
    const {projects, setProjects} = useProjectsValue();
    const {setSelectedProject} = useSelectedProjectValue();

    const deleteProject = docId => {
        firebase
            .firestore()
            .collection('projects')
            .doc(docId)
            .delete()
            .then(() => {
                setProjects([...projects]);
                setSelectedProject('INBOX');
            });
    };


    return (
        <>
            <span className="sidebar__dot">•</span>
            <span className="sidebar__project-name">{project.name}</span>
            <span className="sidebar__project-delete" data-testid={'delete-project'}
                  onKeyPress={e => {
                      if (e.key === "Enter") {
                          setShowConfirm(!showConfirm)
                      }
                  }}
                  onClick={() => setShowConfirm(!showConfirm)}
                  tabIndex={0}
                  aria-label="Confirm deletion of project"
                  role="button">
                <FaTrashAlt/>
                {showConfirm && (
                    <div className='project-delete-modal'>
                        <div className="project-delete-modal__inner">
                            <p>Are you sure you want to delete this project?</p>
                            <button
                                type="button"
                                onClick={() => {
                                    deleteProject(project.docId);
                                }}>
                                Delete
                            </button>
                            <span
                                aria-label="Cancel deleting project"
                                data-testid='cancel-project-delete'
                                onClick={() => setShowConfirm(!showConfirm)}
                                onKeyPress={e => {
                                    if (e.key === "Enter") {
                                        setShowConfirm(!showConfirm);
                                    }
                                }}
                                tabIndex={0}
                                role="button"
                            >Cancel</span>
                        </div>
                    </div>
                )}
            </span>
        </>);
};
