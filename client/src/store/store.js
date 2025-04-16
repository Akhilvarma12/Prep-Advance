import {create} from 'zustand';

 const useStore = create( (set) => ({
     jobPositions:"Frontend Developer",
    jobDesci:"React",
    jobExperiences:"2",

    setJobDesci: (desc) => set({jobDesc:desc}),
    setJobExperiences: (desc) => set({jobExperience:desc}),
    setJobPositions: (desc) => set({jobPosition:desc}),



}));

export default useStore;

