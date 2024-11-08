import React, { useState, useEffect } from 'react';
import { Save, Upload, RefreshCw, Moon, Sun } from 'lucide-react';

const loadStoredConfig = () => {
  try {
    const storedConfig = localStorage.getItem('cssWizardConfig');
    if (storedConfig) {
      return JSON.parse(storedConfig);
    }
  } catch (error) {
    console.error('Error loading stored config:', error);
  }
  return null;
};

const CSSWizard = () => {
  const [darkMode, setDarkMode] = useState(() => {
    const stored = localStorage.getItem('cssWizardDarkMode');
    return stored ? JSON.parse(stored) : true;
  });

  const [cssVars, setCssVars] = useState(() => {
    const stored = loadStoredConfig();
    return stored?.cssVars || {
      backdrop_filter: 'blur(8px)',
      border_color: '#1B5E20',
      focus_border_color: '#4169E1',
      hover_border_color: '#DC143C',
      border_width: '5px',
      border_radius: '.375rem',
      font_family: 'Arial',
      text_color: '#FFD700',
      background_color: '#000000',
    };
  });

  const [toggles, setToggles] = useState(() => {
    const stored = loadStoredConfig();
    return stored?.toggles || {
      enable_font: true,
      enable_text_color: true,
      enable_background: true,
      enable_borders: true,
      enable_backdrop_filter: true,
      enable_hover_effects: true,
      enable_focus_effects: true,
    };
  });

  // Save config whenever it changes
  useEffect(() => {
    localStorage.setItem('cssWizardConfig', JSON.stringify({ cssVars, toggles }));
  }, [cssVars, toggles]);

  // Save dark mode preference
  useEffect(() => {
    localStorage.setItem('cssWizardDarkMode', JSON.stringify(darkMode));
    // Update document class for dark mode
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Constants for options
  const fontOptions = [
    "Arial", "Verdana", "Helvetica", "Tahoma", "Trebuchet MS",
    "Times New Roman", "Georgia", "Garamond", "Courier New",
    "Brush Script MT", "Impact", "Comic Sans MS", "system-ui",
    "Roboto", "Open Sans", "Segoe UI"
  ];

  const borderWidthOptions = [
    "1px", "2px", "3px", "4px", "5px",
    "6px", "8px", "10px", "12px", "16px"
  ];

  const borderRadiusOptions = [
    ".125rem", ".25rem", ".375rem",
    ".5rem", ".75rem", "1rem"
  ];

  const backdropFilterOptions = [
    "blur(8px)", "blur(4px)",
    "blur(12px)", "blur(16px)"
  ];
  
const generateCSS = () => {
    const cssParts = ["/* Generated by Gethomepage CSS Wizard */", ""];
    cssParts.push(":root {");
    
    if (toggles.enable_backdrop_filter) {
      cssParts.push(`  --my-backdrop-filter: ${cssVars.backdrop_filter};`);
    }
    if (toggles.enable_borders) {
      cssParts.push(`  --my-border-color: ${cssVars.border_color};`);
      cssParts.push(`  --my-border-width: ${cssVars.border_width};`);
      cssParts.push(`  --my-border-radius: ${cssVars.border_radius};`);
    }
    if (toggles.enable_hover_effects) {
      cssParts.push(`  --my-hover-border-color: ${cssVars.hover_border_color};`);
    }
    if (toggles.enable_focus_effects) {
      cssParts.push(`  --my-focus-border-color: ${cssVars.focus_border_color};`);
    }
    if (toggles.enable_font) {
      cssParts.push(`  --my-font: "${cssVars.font_family}";`);
    }
    
    cssParts.push("}");

    // Font and text color
    if (toggles.enable_font || toggles.enable_text_color) {
      cssParts.push("\n* {");
      if (toggles.enable_font) {
        cssParts.push("  font-family: var(--my-font) !important;");
      }
      if (toggles.enable_text_color) {
        cssParts.push(`  color: ${cssVars.text_color} !important;`);
      }
      cssParts.push("}");
    }

    // Background color
    if (toggles.enable_background) {
      cssParts.push(`\n#page_container {\n  background-color: ${cssVars.background_color};\n}`);
    }

    // Service Widgets Border Styles
    if (toggles.enable_borders || toggles.enable_backdrop_filter) {
      cssParts.push(`
/* Service Widgets Border Styles */
#information-widgets,
.bookmark-text,
.service-card {`);
      if (toggles.enable_borders) {
        cssParts.push(`  border-width: var(--my-border-width);
  border-radius: var(--my-border-radius);
  border-color: var(--my-border-color);`);
      }
      if (toggles.enable_backdrop_filter) {
        cssParts.push("  backdrop-filter: var(--my-backdrop-filter);");
      }
      cssParts.push("}");
    }

    // Tab Border Styles
    if (toggles.enable_borders) {
      cssParts.push(`
/* Tab Border Styles */
button[id$='-tab'] {
  border-width: var(--my-border-width);
  border-radius: var(--my-border-radius);
  border-color: var(--my-border-color);`);
      if (toggles.enable_backdrop_filter) {
        cssParts.push("  backdrop-filter: var(--my-backdrop-filter);");
      }
      cssParts.push("}");
    }

    // Hover and Focus States
    if (toggles.enable_hover_effects || toggles.enable_focus_effects) {
      cssParts.push("\n/* Hover and Focus States */");
      if (toggles.enable_hover_effects) {
        cssParts.push(`button[id$='-tab']:hover,
.service-card:hover,
.bookmark-text:hover {
  border-color: var(--my-hover-border-color);
}`);
      }
      if (toggles.enable_focus_effects) {
        cssParts.push(`
button[id$='-tab']:focus {
  border-color: var(--my-focus-border-color);
}`);
      }
    }

    // Add Mobile Styles
    cssParts.push(`
/* Mobile Styles */
@media screen and (max-width: 768px) {
  #myTab {
    padding: 5px;
    background: none;
    backdrop-filter: none;
    display: flex;
    justify-content: flex-start;  
    flex-wrap: wrap;
    justify-content: center;
    gap: 10px;
  }
  button[id$='-tab']::focus::hover {
    border-width: var(--my-border-width);
    padding: 10px;
    margin: 0;
    width: calc(50% - 5px);
    justify-content: center;
  }
}

/* Landscape-specific Mobile Styles */
@media screen and (max-width: 850px) and (orientation: landscape) {
  #widgets-wrap,
  .service-card  {
    gap: 1em;
  }
  .information-widget-resource {
    margin-left: 20px;
    margin-right: 20px;
    flex-wrap: wrap;
    justify-content: center;		
  }
  #myTab {
    flex-wrap: nowrap;
    overflow-x: auto;
    justify-content: flex-start;
    padding-bottom: 10px;
    gap: 5px;
  }
  button[id$='-tab']::focus::hover {
    border-width: var(--my-border-width);
    margin: auto;
    width: 100%;
  }
}

/* Portrait-specific Mobile Styles */
@media screen and (max-width: 480px) and (orientation: portrait) {
  #widgets-wrap,
  .service-card  {
    gap: 1em;
  }
  .information-widget-resource {
    margin-left: 20px;
    margin-right: 20px;
    flex-wrap: wrap;
    justify-content: center;		
  }
  button[id$='-tab']::focus::hover {
    border-width: var(--my-border-width);
    margin: auto;
    width: 100%;
  }
}`);

    return cssParts.join('\n');
  };

const handleSave = () => {
    const css = generateCSS();
    // Save CSS file
    const cssBlob = new Blob([css], { type: 'text/css' });
    const cssUrl = URL.createObjectURL(cssBlob);
    const cssLink = document.createElement('a');
    cssLink.href = cssUrl;
    cssLink.download = 'custom.css';
    document.body.appendChild(cssLink);
    cssLink.click();
    document.body.removeChild(cssLink);
    URL.revokeObjectURL(cssUrl);

    // Save configuration
    const config = {
      cssVars,
      toggles,
      darkMode
    };
    const configBlob = new Blob([JSON.stringify(config, null, 2)], { type: 'application/json' });
    const configUrl = URL.createObjectURL(configBlob);
    const configLink = document.createElement('a');
    configLink.href = configUrl;
    configLink.download = 'custom.css.json';
    document.body.appendChild(configLink);
    configLink.click();
    document.body.removeChild(configLink);
    URL.revokeObjectURL(configUrl);
  };

  const handleLoad = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const config = JSON.parse(e.target.result);
          if (config.cssVars) {
            setCssVars(config.cssVars);
            localStorage.setItem('cssWizardConfig', JSON.stringify(config));
          }
          if (config.toggles) setToggles(config.toggles);
          if (config.darkMode !== undefined) setDarkMode(config.darkMode);
        } catch (error) {
          console.error('Failed to load configuration:', error);
          alert('Failed to load configuration file');
        }
      };
      reader.readAsText(file);
    }
  };  
  
return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900' : 'bg-gray-100'} p-8 transition-colors`}>
      <div className={`max-w-6xl mx-auto ${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg p-6 transition-colors`}>
        <div className="flex justify-between items-center mb-6">
          <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Gethomepage CSS Wizard
          </h1>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`p-2 rounded-full ${darkMode ? 'bg-gray-700 text-yellow-400' : 'bg-gray-200 text-gray-700'}`}
            title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Settings Panel */}
          <div className="space-y-6">
            {/* Feature Toggles */}
            <div className={`${darkMode ? 'bg-gray-700' : 'bg-gray-50'} p-4 rounded-lg transition-colors`}>
              <h2 className={`text-xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Feature Toggles
              </h2>
              <div className="space-y-2">
                {Object.entries(toggles).map(([key, value]) => (
                  <label key={key} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={value}
                      onChange={(e) => setToggles({...toggles, [key]: e.target.checked})}
                      className={`rounded ${darkMode ? 'bg-gray-600 border-gray-500' : 'bg-white border-gray-300'}`}
                    />
                    <span className={darkMode ? 'text-gray-200' : 'text-gray-700'}>
                      {key.replace(/_/g, ' ').replace(/enable /g, '').replace(/\b\w/g, l => l.toUpperCase())}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* General Settings */}
            <div className={`${darkMode ? 'bg-gray-700' : 'bg-gray-50'} p-4 rounded-lg transition-colors`}>
              <h2 className={`text-xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                General Settings
              </h2>
              <div className="space-y-4">
                <div>
                  <label className={`block mb-1 ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                    Font Family
                  </label>
                  <select 
                    value={cssVars.font_family}
                    onChange={(e) => setCssVars({...cssVars, font_family: e.target.value})}
                    className={`w-full p-2 border rounded ${
                      darkMode 
                        ? 'bg-gray-600 border-gray-500 text-white' 
                        : 'bg-white border-gray-300'
                    }`}
                  >
                    {fontOptions.map(font => (
                      <option key={font} value={font}>{font}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className={`block mb-1 ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                    Border Width
                  </label>
                  <select
                    value={cssVars.border_width}
                    onChange={(e) => setCssVars({...cssVars, border_width: e.target.value})}
                    className={`w-full p-2 border rounded ${
                      darkMode 
                        ? 'bg-gray-600 border-gray-500 text-white' 
                        : 'bg-white border-gray-300'
                    }`}
                  >
                    {borderWidthOptions.map(width => (
                      <option key={width} value={width}>{width}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className={`block mb-1 ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                    Border Radius
                  </label>
                  <select
                    value={cssVars.border_radius}
                    onChange={(e) => setCssVars({...cssVars, border_radius: e.target.value})}
                    className={`w-full p-2 border rounded ${
                      darkMode 
                        ? 'bg-gray-600 border-gray-500 text-white' 
                        : 'bg-white border-gray-300'
                    }`}
                  >
                    {borderRadiusOptions.map(radius => (
                      <option key={radius} value={radius}>{radius}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className={`block mb-1 ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                    Backdrop Filter
                  </label>
                  <select
                    value={cssVars.backdrop_filter}
                    onChange={(e) => setCssVars({...cssVars, backdrop_filter: e.target.value})}
                    className={`w-full p-2 border rounded ${
                      darkMode 
                        ? 'bg-gray-600 border-gray-500 text-white' 
                        : 'bg-white border-gray-300'
                    }`}
                  >
                    {backdropFilterOptions.map(filter => (
                      <option key={filter} value={filter}>{filter}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Color Settings */}
            <div className={`${darkMode ? 'bg-gray-700' : 'bg-gray-50'} p-4 rounded-lg transition-colors`}>
              <h2 className={`text-xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Colors & Borders
              </h2>
              <div className="space-y-4">
                {Object.entries(cssVars).map(([key, value]) => (
                  key.includes('color') && (
                    <div key={key}>
                      <label className={`block mb-1 ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                        {key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      </label>
                      <div className="flex space-x-2">
                        <input
                          type="color"
                          value={value}
                          onChange={(e) => setCssVars({...cssVars, [key]: e.target.value})}
                          className="h-8"
                        />
                        <input
                          type="text"
                          value={value}
                          onChange={(e) => setCssVars({...cssVars, [key]: e.target.value})}
                          className={`flex-1 p-1 border rounded ${
                            darkMode 
                              ? 'bg-gray-600 border-gray-500 text-white' 
                              : 'bg-white border-gray-300'
                          }`}
                        />
                      </div>
                    </div>
                  )
                ))}
              </div>
            </div>
          </div>

          {/* Preview Panel */}
          <div className={`${darkMode ? 'bg-gray-700' : 'bg-gray-50'} p-4 rounded-lg transition-colors`}>
            <div className="flex justify-between items-center mb-4">
              <h2 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                CSS Preview
              </h2>
              <div className="space-x-2">
                <button
                  onClick={handleSave}
                  className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                  title="Save CSS"
                >
                  <Save className="w-4 h-4" />
                </button>
                <label className="p-2 bg-green-500 text-white rounded hover:bg-green-600 cursor-pointer inline-flex transition-colors">
                  <Upload className="w-4 h-4" />
                  <input
                    type="file"
                    onChange={handleLoad}
                    accept=".json"
                    className="hidden"
                  />
                </label>
              </div>
            </div>
            <pre className={`${
              darkMode ? 'bg-gray-900' : 'bg-gray-800'
            } text-gray-100 p-4 rounded-lg overflow-auto h-96 text-sm transition-colors`}>
              {generateCSS()}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CSSWizard;  