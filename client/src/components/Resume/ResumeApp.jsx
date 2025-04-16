import React, { useState } from 'react';
import { Box, Button, Container, CssBaseline } from '@mui/material';
import { usePDF } from 'react-to-pdf';
import { Download } from 'lucide-react';
import ResumeForm from './ResumeForm';
import Resume from './Resume';

function ResumeApp() {
  const [resumeData, setResumeData] = useState(null); // Removed TypeScript type annotations
  const { toPDF, targetRef } = usePDF({ filename: 'resume.pdf' });

  const handleSubmit = (data) => {
    setResumeData(data);
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Container 
        maxWidth="lg" 
        style={{
          minHeight: '100vh',
          backgroundColor: '#f5f5f5',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {!resumeData ? (
          <ResumeForm onSubmit={handleSubmit} />
        ) : (
          <Box style={{ position: 'relative', width: '100%' }}>
            <Box ref={targetRef} style={{ padding: '20px', backgroundColor: 'white', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
              <Resume data={resumeData} />
            </Box>
            <Box style={{ position: 'fixed', bottom: '24px', right: '24px', display: 'flex', gap: '16px' }}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => toPDF()}
                startIcon={<Download />}
              >
                Download PDF
              </Button>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => setResumeData(null)}
              >
                Edit Resume
              </Button>
            </Box>
          </Box>
        )}
      </Container>
    </React.Fragment>
  );
}

export default ResumeApp;
