import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Grid,
  IconButton,
} from '@mui/material';
import { Plus, Trash2 } from 'lucide-react';

const initialData = {
  fullName: '',
  email: '',
  phone: '',
  linkedin: '',
  github: '',
  education: [{ collegeName: '', degreeName: '', cgpa: '', startDate: '', endDate: '' }],
  projects: [{ name: '', techStack: '', description: '', date: '' }],
  internships: [{ companyName: '', role: '', description: '', startDate: '', endDate: '' }],
  technicalSkills: '',
  certifications: '',
  extracurricular: '',
};

export default function ResumeForm({ onSubmit }) {
  const [formData, setFormData] = useState(initialData);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const addEducation = () => {
    setFormData((prev) => ({
      ...prev,
      education: [...prev.education, { collegeName: '', degreeName: '', cgpa: '', startDate: '', endDate: '' }],
    }));
  };

  const addProject = () => {
    setFormData((prev) => ({
      ...prev,
      projects: [...prev.projects, { name: '', techStack: '', description: '', date: '' }],
    }));
  };

  const addInternship = () => {
    setFormData((prev) => ({
      ...prev,
      internships: [...prev.internships, { companyName: '', role: '', description: '', startDate: '', endDate: '' }],
    }));
  };

  return (
    <Paper
      component="form"
      onSubmit={handleSubmit}
      sx={{
        p: 4,
        maxWidth: 800,
        mx: 'auto',
        my: 4,
        boxShadow: 3,
        borderRadius: 2,
      }}
    >
      <Typography variant="h4" gutterBottom>
        Resume Builder
      </Typography>

      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Personal Information
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Full Name"
              value={formData.fullName}
              onChange={(e) => handleChange('fullName', e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Email"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Phone"
              value={formData.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="LinkedIn"
              value={formData.linkedin}
              onChange={(e) => handleChange('linkedin', e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="GitHub"
              value={formData.github}
              onChange={(e) => handleChange('github', e.target.value)}
            />
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Education
          <IconButton onClick={addEducation} size="small" sx={{ ml: 1 }}>
            <Plus size={20} />
          </IconButton>
        </Typography>
        {formData.education.map((edu, index) => (
          <Grid container spacing={2} key={index} sx={{ mb: 2 }}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="College Name"
                value={edu.collegeName}
                onChange={(e) => {
                  const newEducation = [...formData.education];
                  newEducation[index].collegeName = e.target.value;
                  handleChange('education', newEducation);
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Degree"
                value={edu.degreeName}
                onChange={(e) => {
                  const newEducation = [...formData.education];
                  newEducation[index].degreeName = e.target.value;
                  handleChange('education', newEducation);
                }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="CGPA"
                value={edu.cgpa}
                onChange={(e) => {
                  const newEducation = [...formData.education];
                  newEducation[index].cgpa = e.target.value;
                  handleChange('education', newEducation);
                }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Start Date"
                type="month"
                value={edu.startDate}
                onChange={(e) => {
                  const newEducation = [...formData.education];
                  newEducation[index].startDate = e.target.value;
                  handleChange('education', newEducation);
                }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="End Date"
                type="month"
                value={edu.endDate}
                onChange={(e) => {
                  const newEducation = [...formData.education];
                  newEducation[index].endDate = e.target.value;
                  handleChange('education', newEducation);
                }}
              />
            </Grid>
          </Grid>
        ))}
      </Box>

      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Projects
          <IconButton onClick={addProject} size="small" sx={{ ml: 1 }}>
            <Plus size={20} />
          </IconButton>
        </Typography>
        {formData.projects.map((project, index) => (
          <Grid container spacing={2} key={index} sx={{ mb: 2 }}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Project Name"
                value={project.name}
                onChange={(e) => {
                  const newProjects = [...formData.projects];
                  newProjects[index].name = e.target.value;
                  handleChange('projects', newProjects);
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Technology Stack"
                value={project.techStack}
                onChange={(e) => {
                  const newProjects = [...formData.projects];
                  newProjects[index].techStack = e.target.value;
                  handleChange('projects', newProjects);
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={2}
                label="Description"
                value={project.description}
                onChange={(e) => {
                  const newProjects = [...formData.projects];
                  newProjects[index].description = e.target.value;
                  handleChange('projects', newProjects);
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Date"
                type="month"
                value={project.date}
                onChange={(e) => {
                  const newProjects = [...formData.projects];
                  newProjects[index].date = e.target.value;
                  handleChange('projects', newProjects);
                }}
              />
            </Grid>
          </Grid>
        ))}
      </Box>

      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Technical Skills
        </Typography>
        <TextField
          fullWidth
          multiline
          rows={3}
          label="List your technical skills"
          value={formData.technicalSkills}
          onChange={(e) => handleChange('technicalSkills', e.target.value)}
        />
      </Box>

      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Certifications
        </Typography>
        <TextField
          fullWidth
          multiline
          rows={3}
          label="List your certifications"
          value={formData.certifications}
          onChange={(e) => handleChange('certifications', e.target.value)}
        />
      </Box>

      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Extracurricular Activities
        </Typography>
        <TextField
          fullWidth
          multiline
          rows={3}
          label="List your extracurricular activities"
          value={formData.extracurricular}
          onChange={(e) => handleChange('extracurricular', e.target.value)}
        />
      </Box>

      <Button variant="contained" color="primary" type="submit" fullWidth>
        Generate Resume
      </Button>
    </Paper>
  );
}
