import React from 'react';
import { Box, Typography, Paper, Link, Grid } from '@mui/material';

export default function Resume({ data }) {
  return (
    <Paper sx={{ p: 4, maxWidth: 800, mx: 'auto', my: 4 }} id="resume-content">
      <Box sx={{ textAlign: 'center', mb: 3 }}>
        <Typography variant="h4" gutterBottom>{data.fullName}</Typography>
        <Typography variant="body1">
          {data.email} • {data.phone}
        </Typography>
        <Typography variant="body1">
          <Link href={data.linkedin} target="_blank">LinkedIn</Link> •{' '}
          <Link href={data.github} target="_blank">GitHub</Link>
        </Typography>
      </Box>

      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" gutterBottom sx={{ borderBottom: 1, borderColor: 'divider' }}>
          EDUCATION
        </Typography>
        {data.education.map((edu, index) => (
          <Box key={index} sx={{ mb: 2 }}>
            <Grid container justifyContent="space-between">
              <Grid item>
                <Typography variant="subtitle1" fontWeight="bold">{edu.collegeName}</Typography>
              </Grid>
              <Grid item>
                <Typography variant="body2">
                  {edu.startDate} - {edu.endDate}
                </Typography>
              </Grid>
            </Grid>
            <Typography variant="body1">{edu.degreeName} • CGPA: {edu.cgpa}</Typography>
          </Box>
        ))}
      </Box>

      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" gutterBottom sx={{ borderBottom: 1, borderColor: 'divider' }}>
          PROJECTS
        </Typography>
        {data.projects.map((project, index) => (
          <Box key={index} sx={{ mb: 2 }}>
            <Grid container justifyContent="space-between">
              <Grid item>
                <Typography variant="subtitle1" fontWeight="bold">{project.name}</Typography>
              </Grid>
              <Grid item>
                <Typography variant="body2">{project.date}</Typography>
              </Grid>
            </Grid>
            <Typography variant="body1">{project.description}</Typography>
            <Typography variant="body2">Tech Stack: {project.techStack}</Typography>
          </Box>
        ))}
      </Box>

      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" gutterBottom sx={{ borderBottom: 1, borderColor: 'divider' }}>
          TECHNICAL SKILLS
        </Typography>
        <Typography variant="body1">{data.technicalSkills}</Typography>
      </Box>

      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" gutterBottom sx={{ borderBottom: 1, borderColor: 'divider' }}>
          CERTIFICATIONS
        </Typography>
        <Typography variant="body1">{data.certifications}</Typography>
      </Box>

      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" gutterBottom sx={{ borderBottom: 1, borderColor: 'divider' }}>
          EXTRACURRICULAR ACTIVITIES
        </Typography>
        <Typography variant="body1">{data.extracurricular}</Typography>
      </Box>
    </Paper>
  );
}
