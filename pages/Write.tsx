import React, { useState } from 'react';
import { WriterForm } from '../types';
import { generateArticleIdeas, checkGrammarAndTone } from '../services/geminiService';
import { Sparkles, Send, Loader2, CheckCircle } from 'lucide-react';

const Write: React.FC = () => {
  const [formData, setFormData] = useState<WriterForm>({
    fullName: '',
    email: '',
    linkedinUrl: '',
    topicProposal: '',
    sampleContent: ''
  });

  const [aiIdeas, setAiIdeas] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [feedback, setFeedback] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleGenerateIdeas = async () => {
    if (!formData.topicProposal) {
      alert("Please enter a broad topic first!");
      return;
    }
    setIsGenerating(true);
    const ideas = await generateArticleIdeas(formData.topicProposal);
    setAiIdeas(ideas);
    setIsGenerating(false);
  };

  const handleAnalyze = async () => {
    if (!formData.sampleContent) return;
    setIsAnalyzing(true);
    const result = await checkGrammarAndTone(formData.sampleContent);
    setFeedback(result);
    setIsAnalyzing(false);
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate submission
    setTimeout(() => {
      setIsSubmitted(true);
    }, 1000);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 shadow-xl text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600 mb-6">
            <CheckCircle size={32} />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Application Received!</h2>
          <p className="text-slate-500 mb-6">Thanks for your interest in writing for SoyGarfield. We'll review your proposal and get back to you within 48 hours.</p>
          <button 
            onClick={() => window.location.href = '/'}
            className="w-full rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white hover:bg-slate-800"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-16 lg:py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <span className="inline-block rounded-full bg-orange-100 px-3 py-1 text-xs font-medium text-orange-600 mb-4">
            Join the Team
          </span>
          <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">Write on SoyGarfield</h1>
          <p className="mt-4 text-slate-500">
            Share your expertise with our community of SEOs and marketers. 
            Use our internal AI tools to refine your pitch.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 p-8 sm:p-12 border border-gray-100">
          <div className="space-y-8">
            {/* Personal Info */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  id="fullName"
                  required
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="block w-full rounded-xl border-gray-200 bg-slate-50 px-4 py-3 text-slate-900 focus:border-garfield-500 focus:bg-white focus:ring-garfield-500 sm:text-sm transition-colors"
                  placeholder="Jane Doe"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="block w-full rounded-xl border-gray-200 bg-slate-50 px-4 py-3 text-slate-900 focus:border-garfield-500 focus:bg-white focus:ring-garfield-500 sm:text-sm transition-colors"
                  placeholder="jane@example.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="linkedinUrl" className="block text-sm font-medium text-slate-700 mb-1">LinkedIn Profile</label>
              <input
                type="url"
                name="linkedinUrl"
                id="linkedinUrl"
                value={formData.linkedinUrl}
                onChange={handleInputChange}
                className="block w-full rounded-xl border-gray-200 bg-slate-50 px-4 py-3 text-slate-900 focus:border-garfield-500 focus:bg-white focus:ring-garfield-500 sm:text-sm transition-colors"
                placeholder="https://linkedin.com/in/..."
              />
            </div>

            {/* AI Enhanced Section */}
            <div className="bg-garfield-50/50 p-6 rounded-2xl border border-garfield-100">
              <div className="flex items-center justify-between mb-2">
                <label htmlFor="topicProposal" className="block text-sm font-medium text-slate-900">Topic Proposal / Headline</label>
                <button
                  type="button"
                  onClick={handleGenerateIdeas}
                  disabled={isGenerating}
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-garfield-600 hover:text-garfield-700 disabled:opacity-50"
                >
                  {isGenerating ? <Loader2 className="animate-spin h-3 w-3" /> : <Sparkles className="h-3 w-3" />}
                  {isGenerating ? 'Brainstorming...' : 'Ask AI for Ideas'}
                </button>
              </div>
              <input
                type="text"
                name="topicProposal"
                id="topicProposal"
                required
                value={formData.topicProposal}
                onChange={handleInputChange}
                className="block w-full rounded-xl border-gray-200 bg-white px-4 py-3 text-slate-900 focus:border-garfield-500 focus:ring-garfield-500 sm:text-sm"
                placeholder="e.g., The future of link building..."
              />
              
              {/* AI Suggestions */}
              {aiIdeas.length > 0 && (
                <div className="mt-4 space-y-2">
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">AI Suggestions:</p>
                  <ul className="space-y-2">
                    {aiIdeas.map((idea, idx) => (
                      <li 
                        key={idx} 
                        onClick={() => setFormData(prev => ({...prev, topicProposal: idea}))}
                        className="text-sm text-slate-700 bg-white p-2 rounded-lg border border-gray-100 cursor-pointer hover:border-garfield-300 hover:text-garfield-700 transition-colors"
                      >
                        {idea}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label htmlFor="sampleContent" className="block text-sm font-medium text-slate-700">Writing Sample (Intro)</label>
                <button
                  type="button"
                  onClick={handleAnalyze}
                  disabled={isAnalyzing || !formData.sampleContent}
                  className="text-xs font-medium text-slate-500 hover:text-garfield-600 disabled:opacity-50"
                >
                  {isAnalyzing ? 'Analyzing...' : 'Check Tone'}
                </button>
              </div>
              <textarea
                name="sampleContent"
                id="sampleContent"
                rows={4}
                value={formData.sampleContent}
                onChange={handleInputChange}
                className="block w-full rounded-xl border-gray-200 bg-slate-50 px-4 py-3 text-slate-900 focus:border-garfield-500 focus:bg-white focus:ring-garfield-500 sm:text-sm transition-colors"
                placeholder="Paste the first paragraph of your proposed article here..."
              />
              {feedback && (
                <div className="mt-2 flex gap-2 items-start text-sm text-slate-600 bg-slate-100 p-3 rounded-lg">
                  <Sparkles className="h-4 w-4 text-garfield-500 flex-shrink-0 mt-0.5" />
                  <p>{feedback}</p>
                </div>
              )}
            </div>

             {/* File Upload (replaces react-dropzone) */}
             <div>
                <label htmlFor="file-upload" className="block text-sm font-medium text-slate-700 mb-2">Upload Resume/Portfolio (Optional)</label>
                <input 
                  type="file" 
                  id="file-upload"
                  className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-garfield-50 file:text-garfield-700 hover:file:bg-garfield-100"
                />
             </div>

            <div className="pt-4">
              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-8 py-4 text-base font-bold text-white transition-all hover:bg-slate-800 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-garfield-500 focus:ring-offset-2"
              >
                Submit Application <Send size={18} />
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Write;