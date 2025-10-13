'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Box, Typography, Button, Paper } from '@mui/material';
import { motion } from 'framer-motion';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import RefreshIcon from '@mui/icons-material/Refresh';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          minHeight: '50vh',
          padding: 2 
        }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Paper
              elevation={3}
              sx={{
                padding: 4,
                textAlign: 'center',
                maxWidth: 500,
                background: 'var(--card)',
                border: '1px solid var(--border)',
              }}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              >
                <ErrorOutlineIcon 
                  sx={{ 
                    fontSize: 64, 
                    color: 'var(--destructive)',
                    marginBottom: 2 
                  }} 
                />
              </motion.div>
              
              <Typography 
                variant="h5" 
                gutterBottom 
                sx={{ 
                  color: 'var(--foreground)',
                  fontWeight: 'bold',
                  marginBottom: 2
                }}
              >
                Oops! Something went wrong
              </Typography>
              
              <Typography 
                variant="body1" 
                paragraph 
                sx={{ 
                  color: 'var(--secondary)',
                  marginBottom: 3
                }}
              >
                We encountered an unexpected error. Don&apos;t worry, it&apos;s not your fault!
              </Typography>
              
              {process.env.NODE_ENV === 'development' && this.state.error && (
                <Box sx={{ 
                  background: 'var(--muted)', 
                  padding: 2, 
                  borderRadius: 1,
                  marginBottom: 3,
                  textAlign: 'left'
                }}>
                  <Typography 
                    variant="caption" 
                    sx={{ 
                      color: 'var(--destructive)',
                      fontFamily: 'monospace',
                      wordBreak: 'break-all'
                    }}
                  >
                    {this.state.error.message}
                  </Typography>
                </Box>
              )}
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="contained"
                  startIcon={<RefreshIcon />}
                  onClick={this.handleRetry}
                  sx={{
                    background: 'var(--gradient-primary)',
                    color: 'var(--primary-foreground)',
                    padding: '12px 24px',
                    borderRadius: 2,
                    textTransform: 'none',
                    fontWeight: 600,
                    '&:hover': {
                      boxShadow: 'var(--shadow-lg)',
                    }
                  }}
                >
                  Try Again
                </Button>
              </motion.div>
            </Paper>
          </motion.div>
        </Box>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
