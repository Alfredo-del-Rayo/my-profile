import resume from "@/data/resume.json" with {type: "json"};
import type { Objective, Skill, Education,  DesignTeam, ResumeProject, WorkExperience, Interests } from "@/models/Resume.ts"

export default function ResumeContent(){
    return (
        <article className="resume-content">
            <ObjectiveSection objective={resume.objective} />
            <SkillsSection skills={resume.skills} />
            <EducationSection education={resume.education} />
            <TeamsTile teams={resume.teams} />
            <WorkExperienceTile jobs={resume.workExperience} />
            <ProjectsTile projects={resume.projects} />
            <InterestsSection interests={resume.interests} />
        </article>
    )    
}

function ObjectiveSection({objective}: {objective: Objective}){
    return (
        <section className="resume-section">
            <h2>Objective</h2>
            <p>{objective.description}</p>
        </section>
    )
}


function SkillsSection({skills}: {skills: Skill[]}){
    return (
     <section className="resume-section">
        <h2>Skills</h2>
        <ul className="skills-list">
            {
                skills.map((skill: Skill, idx) => (
                    <div key={idx} className="skill-category">
                         {skill.category}
                        <ul className="inner-skills-list">
                           
                            {
                                skill.skills.map((skillName: string, idx:number) => (
                                    <li key={idx}>{skillName}</li>
                                ))
                            }
                        </ul>
                    </div>
                ))
            }
        </ul>
     </section>
    )

}

function EducationSection({education}: {education: Education[]}){
    return (
        <section>
            <h2>Education</h2>
            {
                education.map((ed: Education, idx: number) => (
                    <div key={idx} className="resume-tile">
                        <TileHeader title={ed.school} timeline={ed.timeline} />
                        <p><i>{ed.degree}</i></p>
                        <p className="tab-line"><i>{ed.awards}</i></p>

                    </div>
                ))
            }
        </section>
    )
}

function TeamsTile({teams}: {teams: DesignTeam[]}){
    return (
        <section>
            <h2>Engineering Student Teams</h2>
            {
                teams.map((team: DesignTeam, idx: number)=>(
                    <div key={idx} className="resume-tile">
                        <TileHeader title={team.team} timeline={team.timeline} />
                        <p className="tab-line"><i>{team.position}</i></p>
                        <DescriptionList list={team.description}/>
                    </div>
                ))
            }
        </section>
    )
}

function WorkExperienceTile({jobs}:{jobs: WorkExperience[]}){
    return (
        <section>
            <h2>Work Experience</h2>
            {
                jobs.map((job: WorkExperience, idx: number) => (
                    <div key={idx} className="resume-tile">
                        <TileHeader title={job.company} timeline={job.timeline}/>
                        <p className="tab-line"><i>{job.position}</i></p>
                        <DescriptionList list={job.description} />
                    </div>
                ))
            }
        </section>
    )
}

function ProjectsTile({projects}: {projects: ResumeProject[]}){
    return (
        <section>
            <h2>Technical Projects</h2>
            {
                projects.map((project: ResumeProject, idx: number) => (
                    <div key={idx} className="resume-tile">
                        <TileHeader title={project.name} timeline={project.timeline}/>
                        <p className="tab-line"><i>{project.type}</i></p>
                        <DescriptionList list={project.description} />
                    </div>
                ))
            }
        </section>
    )
}

function InterestsSection({interests}: {interests: Interests}){
    return (
        <section>
            <h2>Interests & Activities</h2>
            <DescriptionList list={interests.description} />
        </section>
    )

}

function TileHeader({title, timeline}: {title: string, timeline: string}){
    return (
        <div className="tile-header">
            <b>{title}</b>
            <b>{timeline}</b>
        </div>
    )
}

function DescriptionList({list}: {list: string[]}){
    return (
        <ul className="description-list resume-tile">
            {
                list.map((val: string, idx: number) => (
                    <li key={idx}>{val}</li>
                ))
            }
        </ul>
    )
}