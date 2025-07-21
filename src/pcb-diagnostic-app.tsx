import React, { useState, useMemo } from 'react';
import { Search, AlertTriangle, Zap, Cpu, Thermometer, Settings, CheckCircle, XCircle, Eye, Wrench } from 'lucide-react';

const PCBDiagnosticApp = () => {
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');

  const failureTypes = [
    {
      id: 'power-supply',
      name: 'Power Supply Failure',
      icon: <Zap className="w-6 h-6" />,
      color: 'bg-red-500',
      description: 'Issues with power delivery and regulation',
      symptoms: [
        { id: 'ps1', text: "Device won't turn on", severity: 'critical' },
        { id: 'ps2', text: 'Intermittent power loss', severity: 'high' },
        { id: 'ps3', text: 'Burning smell or heat from power components', severity: 'critical' },
        { id: 'ps4', text: 'Blown fuse or tripped breaker', severity: 'high' },
        { id: 'ps5', text: 'LED indicators on PCB not lighting up', severity: 'medium' }
      ]
    },
    {
      id: 'capacitor',
      name: 'Capacitor Failure',
      icon: <Settings className="w-6 h-6"/>,
      color: 'bg-orange-500',
      description: 'Electrolytic or ceramic capacitor degradation',
      symptoms: [
        { id: 'cap1', text: 'Bulging or leaking capacitors on the board', severity: 'critical' },
        { id: 'cap2', text: "Device restarts randomly or doesn't boot properly", severity: 'high' },
        { id: 'cap3', text: 'High-pitched whining noise from the device', severity: 'medium' },
        { id: 'cap4', text: 'Voltage instability or ripple in power lines', severity: 'high' },
        { id: 'cap5', text: 'Flickering display or signal noise', severity: 'medium' }
      ]
    },
    {
      id: 'solder-joint',
      name: 'Solder Joint Failure',
      icon: <Wrench className="w-6 h-6" />,
      color: 'bg-yellow-500',
      description: 'Cold joints or cracked solder connections',
      symptoms: [
        { id: 'sj1', text: 'Device works when pressure is applied or when tapped', severity: 'high' },
        { id: 'sj2', text: 'Intermittent connections or failure to detect components', severity: 'high' },
        { id: 'sj3', text: 'Overheating in nearby components', severity: 'medium' },
        { id: 'sj4', text: 'Visual cracks in the solder under magnification', severity: 'critical' },
        { id: 'sj5', text: 'Device fails after temperature change (expansion/contraction)', severity: 'medium' }
      ]
    },
    {
      id: 'ic-failure',
      name: 'Integrated Circuit (IC) Failure',
      icon: <Cpu className="w-6 h-6" />,
      color: 'bg-purple-500',
      description: 'Semiconductor component malfunction',
      symptoms: [
        { id: 'ic1', text: 'Complete or partial device malfunction', severity: 'critical' },
        { id: 'ic2', text: 'Unexpected behavior (e.g., wrong output signals)', severity: 'high' },
        { id: 'ic3', text: 'Device gets hot very quickly', severity: 'high' },
        { id: 'ic4', text: 'Error codes or failure logs pointing to specific functions', severity: 'medium' },
        { id: 'ic5', text: 'Short circuits or excessive current draw', severity: 'critical' }
      ]
    },
    {
      id: 'thermal',
      name: 'Overheating / Thermal Failure',
      icon: <Thermometer className="w-6 h-6"/>,
      color: 'bg-red-600',
      description: 'Temperature-related component stress and failure',
      symptoms: [
        { id: 'th1', text: 'Device shuts down automatically after use', severity: 'high' },
        { id: 'th2', text: 'Fan running at full speed constantly', severity: 'medium' },
        { id: 'th3', text: 'System lag or reduced performance over time', severity: 'medium' },
        { id: 'th4', text: 'Burn marks on PCB or heat sink areas', severity: 'critical' },
        { id: 'th5', text: 'High temperature readings from sensors', severity: 'high' }
      ]
    }
  ];

  const allSymptoms = failureTypes.flatMap(type => 
    type.symptoms.map(symptom => ({
      ...symptom,
      failureType: type.id,
      failureName: type.name,
      color: type.color
    }))
  );

  const toggleSymptom = (symptomId) => {
    setSelectedSymptoms(prev => 
      prev.includes(symptomId) 
        ? prev.filter(id => id !== symptomId)
        : [...prev, symptomId]
    );
  };

  const diagnosisResults = useMemo(() => {
    if (selectedSymptoms.length === 0) return [];

    const typeScores = failureTypes.map(type => {
      const matchedSymptoms = type.symptoms.filter(symptom => 
        selectedSymptoms.includes(symptom.id)
      );
      
      const score = matchedSymptoms.reduce((acc, symptom) => {
        const weight = symptom.severity === 'critical' ? 3 : 
                      symptom.severity === 'high' ? 2 : 1;
        return acc + weight;
      }, 0);

      const confidence = matchedSymptoms.length / type.symptoms.length * 100;

      return {
        ...type,
        matchedSymptoms,
        score,
        confidence: Math.round(confidence),
        likelihood: score > 0 ? Math.min(100, (score / 6) * 100) : 0
      };
    });

    return typeScores
      .filter(type => type.score > 0)
      .sort((a, b) => b.score - a.score);
  }, [selectedSymptoms]);

  const filteredSymptoms = allSymptoms.filter(symptom => {
    const matchesSearch = symptom.text.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = activeFilter === 'all' || symptom.severity === activeFilter;
    return matchesSearch && matchesFilter;
  });

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical': return 'text-red-600 bg-red-50 border-red-200';
      case 'high': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <AlertTriangle className="w-12 h-12 text-blue-600 mr-3" />
            <h1 className="text-4xl font-bold text-gray-800">PCB Diagnostic Tool</h1>
          </div>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Select observed symptoms to identify potential PCB failure types and get diagnostic recommendations
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Symptoms Selection Panel */}
          <div className="lg:col-span-2 space-y-6">
            {/* Search and Filter */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex flex-col sm:flex-row gap-4 mb-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search symptoms..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="flex gap-2">
                  {['all', 'critical', 'high', 'medium'].map(filter => (
                    <button
                      key={filter}
                      onClick={() => setActiveFilter(filter)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        activeFilter === filter
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {filter.charAt(0).toUpperCase() + filter.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Symptoms List */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <Eye className="w-6 h-6 mr-2 text-blue-600" />
                Observed Symptoms
                <span className="ml-3 text-sm bg-blue-100 text-blue-600 px-2 py-1 rounded-full">
                  {selectedSymptoms.length} selected
                </span>
              </h2>
              
              <div className="grid gap-3">
                {filteredSymptoms.map(symptom => (
                  <div
                    key={symptom.id}
                    onClick={() => toggleSymptom(symptom.id)}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all hover:shadow-md ${
                      selectedSymptoms.includes(symptom.id)
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3">
                        {selectedSymptoms.includes(symptom.id) ? (
                          <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                        ) : (
                          <XCircle className="w-5 h-5 text-gray-400 mt-0.5" />
                        )}
                        <div className="flex-1">
                          <p className="text-gray-800 font-medium">{symptom.text}</p>
                          <div className="flex items-center mt-2 space-x-2">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getSeverityColor(symptom.severity)}`}>
                              {symptom.severity.toUpperCase()}
                            </span>
                            <span className="text-sm text-gray-600">{symptom.failureName}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Diagnosis Results Panel */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Diagnosis Results</h2>
              
              {diagnosisResults.length === 0 ? (
                <div className="text-center py-8">
                  <AlertTriangle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">Select symptoms to see diagnosis</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {diagnosisResults.map(result => (
                    <div key={result.id} className="border rounded-lg p-4">
                      <div className="flex items-center mb-3">
                        <div className={`p-2 rounded-full ${result.color} text-white mr-3`}>
                          {result.icon}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-gray-800">{result.name}</h3>
                          <p className="text-sm text-gray-600">{result.description}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-gray-800">
                            {Math.round(result.likelihood)}%
                          </div>
                          <div className="text-xs text-gray-500">likelihood</div>
                        </div>
                      </div>
                      
                      <div className="mb-3">
                        <div className="flex justify-between text-sm mb-1">
                          <span>Match Confidence</span>
                          <span>{result.confidence}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${result.color}`}
                            style={{ width: `${result.confidence}%` }}
                          ></div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <h4 className="font-medium text-gray-700">Matched Symptoms:</h4>
                        {result.matchedSymptoms.map(symptom => (
                          <div key={symptom.id} className="flex items-start text-sm">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                            <span className="text-gray-600">{symptom.text}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Quick Stats</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{selectedSymptoms.length}</div>
                  <div className="text-sm text-gray-600">Symptoms</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{diagnosisResults.length}</div>
                  <div className="text-sm text-gray-600">Matches</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PCBDiagnosticApp;