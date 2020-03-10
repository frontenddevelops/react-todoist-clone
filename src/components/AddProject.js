import React, { useState } from "react";
import { generatePushId } from "../helpers";
import { useProjectsValue } from "../context";
import { firebase } from "../firebase";

export const AddProject = ({shouldShow = false}) => {
    const [show, setShow] = useState(shouldShow);
    const [projectName, setProjectName] = useState('');
    const projectId = generatePushId();
    const {projects, setProjects} = useProjectsValue();

    const addProject = () =>
        projectName &&
        firebase
            .firestore()
            .collection('projects')
            .add({
                projectId,
                name: projectName,
                userId: '1',
            })
            .then(() => {
                setProjects([...projects]);
                setProjectName('');
                setShow(false);
            });

    return (
        <div className='add-project' data-testid='add-project'>
            {show && (
                <div className='add-project__input' data-testid='add-project-inner'>
                    <input
                        value={projectName}
                        onChange={e => setProjectName(e.target.value)}
                        className="add-project__name"
                        data-testid="project-name"
                        type='text'
                        placeholder='Name your project'
                    />
                    <button
                        type='button'
                        className="add-project__submit"
                        onClick={() => addProject()}
                        data-testid="add-project-submit"
                    >
                        Add project
                    </button>
                    <span
                        aria-label="Cancel adding project"
                        data-testid="hide-project-overlay"
                        className="add-project__cancel"
                        onClick={() => setShow(false)}
                        onKeyPress={e => {
                            if (e.key === "Enter") {
                                setShow(false);
                            }
                        }}
                        role="button"
                        tabIndex={0}
                    >
                        Cancel
                    </span>
                </div>
            )}
            <span className="add-project__plus">+</span>
            <span
                aria-label="Add project"
                data-testid="add-project-action"
                className="add-project__text"
                onClick={() => setShow(!show)}
                onKeyPress={e => {
                    if (e.key === "Enter") {
                        setShow(!show);
                    }
                }}
                role="button"
                tabIndex={0}
            >Add project</span>
        </div>
    );
};
