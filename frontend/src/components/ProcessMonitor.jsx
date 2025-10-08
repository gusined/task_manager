import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const ProcessMonitor = () => {
  const [processes, setProcesses] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8080');
        const data = await response.json();
        setProcesses(data);
      } catch (error) {
        console.error('Error fetching processes:', error);
      }
    };
    
    fetchData();
    const interval = setInterval(fetchData, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>PID</TableCell>
            <TableCell>Process Name</TableCell>
            <TableCell align="right">CPU (%)</TableCell>
            <TableCell align="right">Memory (MB)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {processes.map((process) => (
            <TableRow key={process.pid}>
              <TableCell>{process.pid}</TableCell>
              <TableCell>{process.name}</TableCell>
              <TableCell align="right">{process.cpu}</TableCell>
              <TableCell align="right">{(process.memory / 1024).toFixed(2)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ProcessMonitor;
