import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';

const StartupManager = () => {
  const [startupPrograms, setStartupPrograms] = useState([]);

  useEffect(() => {
    const fetchStartupPrograms = async () => {
      try {
        const response = await fetch('http://localhost:8080');
        const data = await response.json();
        setStartupPrograms(data);
      } catch (error) {
        console.error('Error fetching startup programs:', error);
      }
    };
    
    fetchStartupPrograms();
  }, []);

  const handleDisable = async (programName) => {
    try {
      const response = await fetch('http://localhost:8080', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ program: programName })
      });
      
      if (response.ok) {
        setStartupPrograms(startupPrograms.filter(program => program.name !== programName));
      }
    } catch (error) {
      console.error('Error disabling program:', error);
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Program Name</TableCell>
            <TableCell>Status</TableCell>
            <TableCell align="right">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {startupPrograms.map((program) => (
            <TableRow key={program.name}>
              <TableCell>{program.name}</TableCell>
              <TableCell>{program.status}</TableCell>
              <TableCell align="right">
                <Button 
                  variant="contained" 
                  color="error"
                  onClick={() => handleDisable(program.name)}
                >
                  Disable
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default StartupManager;