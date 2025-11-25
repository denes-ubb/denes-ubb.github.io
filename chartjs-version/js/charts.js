// Chart.js Data Visualization Examples
// This file demonstrates how to create various chart types using Chart.js
// Each chart is implemented as a separate function for better organization

/**
 * CHART 1: Population Pyramid
 * Demonstrates a horizontal bar chart with negative values
 * Shows population distribution by age and gender for the year 2000
 */
function createPopulationPyramid() {
  // Fetch data from Vega's public dataset
  fetch('https://vega.github.io/editor/data/population.json')
    .then(response => response.json())
    .then(data => {
      // Filter data for year 2000 only
      const year2000Data = data.filter(d => d.year === 2000);

      // Extract unique age groups and sort in descending order
      const ageGroups = [...new Set(year2000Data.map(d => d.age))].sort((a, b) => b - a);

      // Prepare data for males (positive values)
      const maleData = ageGroups.map(age =>
        year2000Data.find(d => d.age === age && d.sex === 1)?.people || 0
      );

      // Prepare data for females (negative values for left side of chart)
      const femaleData = ageGroups.map(age =>
        -(year2000Data.find(d => d.age === age && d.sex === 2)?.people || 0)
      );

      // Create the Chart.js instance
      new Chart(document.getElementById('chart1'), {
        type: 'bar',
        data: {
          labels: ageGroups,
          datasets: [{
            label: 'Male',
            data: maleData,
            backgroundColor: '#667eea',
            borderRadius: 4,
            borderSkipped: false,
          }, {
            label: 'Female',
            data: femaleData,
            backgroundColor: '#764ba2',
            borderRadius: 4,
            borderSkipped: false,
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
          // Horizontal bar chart (indexAxis: 'y')
          indexAxis: 'y',
          plugins: {
            legend: {
              position: 'top',
              labels: {
                color: '#555'
              }
            },
            tooltip: {
              callbacks: {
                // Format tooltip to show absolute values
                label: function(context) {
                  return context.dataset.label + ': ' + Math.abs(context.parsed.x).toLocaleString();
                }
              }
            }
          },
          scales: {
            x: {
              grid: {
                color: 'rgba(0,0,0,0.06)'
              },
              ticks: {
                color: '#555',
                // Format tick labels to show absolute values
                callback: function(value) {
                  return Math.abs(value).toLocaleString();
                }
              }
            },
            y: {
              grid: {
                color: 'rgba(0,0,0,0.06)'
              },
              ticks: {
                color: '#555'
              }
            }
          }
        }
      });
    })
    .catch(error => console.error('Error loading population data:', error));
}

/**
 * CHART 2: Simple Bar Chart
 * Demonstrates a basic vertical bar chart with custom styling
 * Shows categorical data with hover effects
 */
function createBarChart() {
  // Load data from local JSON file
  fetch('data/chart2-data.json')
    .then(response => response.json())
    .then(data => {
      // Create the Chart.js instance
      new Chart(document.getElementById('chart2'), {
        type: 'bar',
        data: {
          labels: data.map(d => d.category), // Extract category labels
          datasets: [{
            label: 'Amount',
            data: data.map(d => d.amount), // Extract amount values
            backgroundColor: '#764ba2',
            hoverBackgroundColor: '#667eea', // Different color on hover
            borderRadius: 4,
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
          plugins: {
            legend: {
              display: false // Hide legend since we only have one dataset
            },
            tooltip: {
              callbacks: {
                label: function(context) {
                  return 'Amount: ' + context.parsed.y;
                }
              }
            }
          },
          scales: {
            x: {
              ticks: {
                color: '#555'
              },
              grid: {
                color: 'rgba(0,0,0,0.06)'
              }
            },
            y: {
              ticks: {
                color: '#555'
              },
              grid: {
                color: 'rgba(0,0,0,0.06)'
              }
            }
          }
        }
      });
    })
    .catch(error => console.error('Error loading bar chart data:', error));
}

/**
 * CHART 3: Scatter Plot with Multiple Datasets
 * Demonstrates scatter plots with categorical faceting
 * Shows how to create multiple datasets from grouped data
 */
function createScatterPlot() {
  // Load data from local JSON file
  fetch('data/adatom.json')
    .then(response => response.json())
    .then(data => {
      // Extract unique categories for grouping
      const categories = [...new Set(data.map(d => d.c))];
      // Define colors for each category
      const colors = ['#667eea', '#764ba2'];

      // Create datasets for each category
      const datasets = categories.map((category, index) => ({
        label: category,
        // Filter data for this category and format for scatter plot
        data: data.filter(d => d.c === category).map(d => ({
          x: d.a, // x-axis: categorical variable 'a'
          y: d.b  // y-axis: quantitative variable 'b'
        })),
        backgroundColor: colors[index],
        pointRadius: 6,
        pointHoverRadius: 8,
      }));

      // Create the Chart.js instance
      new Chart(document.getElementById('chart3'), {
        type: 'scatter',
        data: {
          datasets: datasets
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
          plugins: {
            legend: {
              position: 'top',
              labels: {
                color: '#555'
              }
            }
          },
          scales: {
            x: {
              type: 'category',
              // Use unique values from data as x-axis labels
              labels: [...new Set(data.map(d => d.a))],
              ticks: {
                color: '#555'
              },
              grid: {
                color: 'rgba(0,0,0,0.06)'
              }
            },
            y: {
              ticks: {
                color: '#555'
              },
              grid: {
                color: 'rgba(0,0,0,0.06)'
              }
            }
          }
        }
      });
    })
    .catch(error => console.error('Error loading scatter plot data:', error));
}

// Initialize all charts when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
  console.log('Initializing Chart.js examples...');

  // Create each chart
  createPopulationPyramid();
  createBarChart();
  createScatterPlot();

  console.log('All charts initialized successfully!');
});
