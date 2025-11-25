// Vizzu Data Visualization Examples
// This file demonstrates how to create static data visualizations using Vizzu
// Each chart is implemented as a separate function for better organization

/**
 * CHART 1: Population Pyramid
 * Demonstrates a horizontal bar chart with negative values
 * Shows population distribution by age and gender for the year 2000
 */
function createPopulationPyramid() {
  // Fetch data from Vega's public dataset
  return fetch('https://vega.github.io/editor/data/population.json')
    .then(response => response.json())
    .then(rawData => {
      // Filter and transform data for Vizzu format
      const year2000Data = rawData.filter(d => d.year === 2000);

      // Prepare data in Vizzu format
      const data = {
        series: [
          { name: 'Age', type: 'dimension', values: [] },
          { name: 'Gender', type: 'dimension', values: [] },
          { name: 'Population', type: 'measure', values: [] }
        ]
      };

      // Transform data for population pyramid
      year2000Data.forEach(d => {
        const age = d.age.toString(); // Convert age to string for dimension
        const gender = d.sex === 1 ? 'Male' : 'Female';
        const population = d.sex === 1 ? d.people : -d.people; // Negative for females

        data.series[0].values.push(age, age); // Age appears twice (male and female)
        data.series[1].values.push('Male', 'Female');
        data.series[2].values.push(d.sex === 1 ? d.people : 0, d.sex === 2 ? -d.people : 0);
      });

      // Filter to only include data we need
      const filteredData = {
        series: [
          { name: 'Age', type: 'dimension', values: [] },
          { name: 'Gender', type: 'dimension', values: [] },
          { name: 'Population', type: 'measure', values: [] }
        ]
      };

      // Group by age and add both male and female
      const ageGroups = [...new Set(year2000Data.map(d => d.age))].sort((a, b) => b - a);

      ageGroups.forEach(age => {
        const maleData = year2000Data.find(d => d.age === age && d.sex === 1);
        const femaleData = year2000Data.find(d => d.age === age && d.sex === 2);

        if (maleData) {
          filteredData.series[0].values.push(age.toString());
          filteredData.series[1].values.push('Male');
          filteredData.series[2].values.push(maleData.people);
        }

        if (femaleData) {
          filteredData.series[0].values.push(age.toString());
          filteredData.series[1].values.push('Female');
          filteredData.series[2].values.push(-femaleData.people); // Negative for left side
        }
      });

      // Initialize Vizzu chart
      // Note: Chart 1 (Population Pyramid) might need simpler data for first initialization to avoid errors
      const chart = new window.Vizzu('chart1', { data: filteredData });

      // Configure the chart as a horizontal bar chart (population pyramid)
      chart.animate({
        config: {
          channels: {
            y: { set: ['Age'] },
            x: { set: ['Population'] },
            color: { set: ['Gender'] }
          },
          geometry: 'rectangle',
          orientation: 'horizontal'
        },
        style: {
          plot: {
            marker: {
              rectangleSpacing: 0
            }
          }
        }
      });

      return chart;
    })
    .catch(error => console.error('Error loading population data:', error));
}

/**
 * CHART 2: Simple Bar Chart
 * Demonstrates a basic vertical bar chart
 * Shows categorical data with amounts
 */
function createBarChart() {
  // Load data from local JSON file
  return fetch('data/chart2-data.json')
    .then(response => response.json())
    .then(rawData => {
      // Transform data to Vizzu format
      const data = {
        series: [
          { name: 'Category', type: 'dimension', values: rawData.map(d => d.category) },
          { name: 'Amount', type: 'measure', values: rawData.map(d => d.amount) }
        ]
      };

      // Initialize Vizzu chart
      const chart = new window.Vizzu('chart2', { data });

      // Configure as vertical bar chart
      chart.animate({
        config: {
          channels: {
            x: { set: ['Category'] },
            y: { set: ['Amount'] },
            color: { set: ['Category'] },
            label: { set: ['Amount'] }
          },
          geometry: 'rectangle'
        }
      });

      return chart;
    })
    .catch(error => console.error('Error loading bar chart data:', error));
}

/**
 * CHART 3: Scatter Plot with Multiple Categories
 * Demonstrates scatter plot with categorical grouping
 * Shows relationship between variables with color encoding
 */
function createScatterPlot() {
  // Load data from local JSON file
  return fetch('data/adatom.json')
    .then(response => response.json())
    .then(rawData => {
      // Transform data to Vizzu format
      const data = {
        series: [
          { name: 'A', type: 'dimension', values: rawData.map(d => d.a) },
          { name: 'B', type: 'measure', values: rawData.map(d => d.b) },
          { name: 'Category', type: 'dimension', values: rawData.map(d => d.c) }
        ]
      };

      // Initialize Vizzu chart
      const chart = new window.Vizzu('chart3', { data });

      // Configure as scatter plot
      chart.animate({
        config: {
          channels: {
            x: { set: ['A'] },
            y: { set: ['B'] },
            color: { set: ['Category'] }
          },
          geometry: 'circle'
        },
        style: {
          plot: {
            marker: {
              borderWidth: 2,
              borderOpacity: 0.5
            }
          }
        }
      });

      return chart;
    })
    .catch(error => console.error('Error loading scatter plot data:', error));
}

// Global chart references for potential animation later
let chart1, chart2, chart3;

// Initialize all charts when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
  console.log('Initializing Vizzu examples...');

  // Check if Vizzu is available
  if (typeof window.Vizzu === 'undefined') {
    console.error('Vizzu library not loaded. Please check the CDN URL.');
    return;
  }

  try {
    // Create each chart and store references for future animations
    chart1 = createPopulationPyramid();
    chart2 = createBarChart();
    chart3 = createScatterPlot();

    // Add animation control for Chart 2
    const btnChart2 = document.getElementById('btn-animate-chart2');
    let isLine = false;

    if (btnChart2) {
      btnChart2.addEventListener('click', () => {
        if (chart2) {
          chart2.then(chart => {
            isLine = !isLine;
            chart.animate({
              config: {
                geometry: isLine ? 'line' : 'rectangle'
              }
            });
            btnChart2.textContent = isLine ? 'Morph to Bar' : 'Morph to Line';
          });
        }
      });
    }

    console.log('All Vizzu charts initialized successfully!');
  } catch (error) {
    console.error('Error initializing charts:', error);
  }
});
