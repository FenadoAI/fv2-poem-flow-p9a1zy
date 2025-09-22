import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, Sparkles, Copy, Download } from 'lucide-react';
import { toast } from 'sonner';
import axios from 'axios';

const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:8000';
const API = `${API_BASE}/api`;

const PoemGenerator = () => {
  const [formData, setFormData] = useState({
    theme: '',
    style: 'free_verse',
    mood: 'neutral',
    length: 'medium'
  });

  const [poem, setPoem] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const generatePoem = async () => {
    if (!formData.theme.trim()) {
      toast.error('Please enter a theme for your poem');
      return;
    }

    setIsLoading(true);
    setError('');
    setPoem('');

    try {
      const response = await axios.post(`${API}/generate-poem`, formData);

      if (response.data.success) {
        setPoem(response.data.poem);
        toast.success('Poem generated successfully!');
      } else {
        setError(response.data.error || 'Failed to generate poem');
        toast.error('Failed to generate poem');
      }
    } catch (err) {
      const errorMsg = err.response?.data?.error || err.message || 'An error occurred';
      setError(errorMsg);
      toast.error('Error generating poem');
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(poem);
      toast.success('Poem copied to clipboard!');
    } catch (err) {
      toast.error('Failed to copy poem');
    }
  };

  const downloadPoem = () => {
    const element = document.createElement('a');
    const file = new Blob([poem], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `poem-${formData.theme.toLowerCase().replace(/\s+/g, '-')}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    toast.success('Poem downloaded!');
  };

  const styleOptions = [
    { value: 'free_verse', label: 'Free Verse' },
    { value: 'haiku', label: 'Haiku' },
    { value: 'sonnet', label: 'Sonnet' },
    { value: 'limerick', label: 'Limerick' }
  ];

  const moodOptions = [
    { value: 'happy', label: 'Happy' },
    { value: 'sad', label: 'Melancholic' },
    { value: 'romantic', label: 'Romantic' },
    { value: 'mysterious', label: 'Mysterious' },
    { value: 'neutral', label: 'Neutral' }
  ];

  const lengthOptions = [
    { value: 'short', label: 'Short (4-8 lines)' },
    { value: 'medium', label: 'Medium (8-16 lines)' },
    { value: 'long', label: 'Long (16-24 lines)' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Sparkles className="w-8 h-8 text-purple-600" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              AI Poem Generator
            </h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Transform your thoughts into beautiful poetry with the power of AI.
            Choose your style, mood, and theme to create unique verses.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="w-5 h-5" />
                Create Your Poem
              </CardTitle>
              <CardDescription>
                Configure the settings to generate your personalized poem
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="theme">Theme or Topic</Label>
                <Input
                  id="theme"
                  placeholder="e.g., love, nature, dreams, friendship..."
                  value={formData.theme}
                  onChange={(e) => handleInputChange('theme', e.target.value)}
                  className="w-full"
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="style">Poetry Style</Label>
                  <Select value={formData.style} onValueChange={(value) => handleInputChange('style', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {styleOptions.map(option => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="mood">Mood</Label>
                  <Select value={formData.mood} onValueChange={(value) => handleInputChange('mood', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {moodOptions.map(option => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="length">Length</Label>
                <Select value={formData.length} onValueChange={(value) => handleInputChange('length', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {lengthOptions.map(option => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button
                onClick={generatePoem}
                disabled={isLoading || !formData.theme.trim()}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Generating Poem...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 mr-2" />
                    Generate Poem
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Your Generated Poem</CardTitle>
              <CardDescription>
                {poem ? 'Your beautiful AI-generated poem is ready!' : 'Your poem will appear here...'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {error && (
                <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
                  {error}
                </div>
              )}

              {poem ? (
                <div className="space-y-4">
                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-lg border border-purple-100">
                    <Textarea
                      value={poem}
                      readOnly
                      className="w-full min-h-[300px] resize-none border-0 bg-transparent text-gray-800 leading-relaxed text-base focus:ring-0"
                      style={{ fontFamily: 'serif' }}
                    />
                  </div>

                  <div className="flex gap-2">
                    <Button
                      onClick={copyToClipboard}
                      variant="outline"
                      size="sm"
                      className="flex-1"
                    >
                      <Copy className="w-4 h-4 mr-2" />
                      Copy
                    </Button>
                    <Button
                      onClick={downloadPoem}
                      variant="outline"
                      size="sm"
                      className="flex-1"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-[300px] text-gray-400 border-2 border-dashed border-gray-200 rounded-lg">
                  <div className="text-center">
                    <Sparkles className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p className="text-lg font-medium">Ready to create poetry</p>
                    <p className="text-sm">Fill out the form and generate your first poem</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PoemGenerator;