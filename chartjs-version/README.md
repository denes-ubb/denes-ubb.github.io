# Chart.js Data Visualization Portfolio

This project demonstrates how to create various data visualizations using Chart.js, as an alternative to Vega-Lite.

## Project Structure

```
chartjs-version/
├── index.html          # Main HTML file
├── js/
│   └── charts.js       # External JavaScript with chart implementations
├── styles/
│   └── styles.css      # CSS styling
└── data/
    ├── chart2-data.json # Data for bar chart
    └── adatom.json      # Data for scatter plot
```

## Chart Examples

### 1. Population Pyramid (Chart 1)
- **Type**: Horizontal Bar Chart
- **Data**: External API (Vega population data)
- **Features**: Negative values, custom tooltips, horizontal layout
- **Function**: `createPopulationPyramid()`

### 2. Simple Bar Chart (Chart 2)
- **Type**: Vertical Bar Chart
- **Data**: Local JSON file
- **Features**: Hover effects, rounded corners
- **Function**: `createBarChart()`

### 3. Scatter Plot with Faceting (Chart 3)
- **Type**: Scatter Plot
- **Data**: Local JSON file
- **Features**: Multiple datasets, categorical grouping
- **Function**: `createScatterPlot()`

## Key Differences: Chart.js vs Vega-Lite

### Chart.js Advantages:
- ✅ **Simpler API**: Direct JavaScript object configuration
- ✅ **Better Performance**: Canvas-based rendering
- ✅ **Fine Control**: Detailed customization of animations and interactions
- ✅ **Small Bundle**: Lightweight core library (~60KB)

### Chart.js Disadvantages:
- ❌ **More Code**: Requires manual data transformation
- ❌ **Imperative**: Less declarative than Vega-Lite
- ❌ **Fewer Built-ins**: Limited statistical transformations

### Vega-Lite Advantages:
- ✅ **Declarative**: JSON specifications are concise
- ✅ **Rich Features**: Built-in data transformations and statistical charts
- ✅ **Grammar-based**: Systematic visualization approach

### Vega-Lite Disadvantages:
- ❌ **Larger Bundle**: More JavaScript to load
- ❌ **Steeper Learning**: JSON specification complexity
- ❌ **Less Flexible**: Harder to customize beyond specification

## Teaching Points

1. **Separation of Concerns**: HTML for structure, CSS for styling, JS for behavior
2. **Modular Functions**: Each chart in its own function for reusability
3. **Data Handling**: Different approaches for local vs remote data
4. **Configuration Objects**: Chart.js uses nested JavaScript objects
5. **Responsive Design**: Charts adapt to container sizes
6. **Error Handling**: Proper fetch error handling
7. **DOM Ready**: Charts initialize after DOM content loads

## Usage

1. Open `index.html` in a web browser
2. Charts will automatically load and render
3. Check browser console for initialization messages
4. Modify `js/charts.js` to experiment with different configurations

## Customization

- **Colors**: Change color schemes in the dataset configurations
- **Data**: Replace JSON files or API endpoints with your own data
- **Styling**: Modify `styles/styles.css` for different layouts
- **Chart Types**: Experiment with other Chart.js chart types (line, pie, etc.)
