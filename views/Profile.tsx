
import React, { useState } from 'react';
import { User } from '../types';

interface ProfileProps {
  user: User;
  onUpdate: (user: User) => void;
}

const Profile: React.FC<ProfileProps> = ({ user, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState<User>(user);

  const handleSave = () => {
    onUpdate(editData);
    setIsEditing(false);
  };

  const FieldEdit = ({ label, field, value }: { label: string, field: keyof User, value: any }) => (
    <div className="p-6 glass-card rounded-2xl flex items-center justify-between group">
      <div className="flex-grow">
        <label className="block text-[10px] font-black uppercase text-slate-400 mb-1">{label}</label>
        <p className="font-semibold text-sm">{value || `Add ${label}...`}</p>
      </div>
      <button 
        onClick={() => setIsEditing(true)}
        className="p-2 opacity-0 group-hover:opacity-100 text-primary-500 hover:bg-primary-50 rounded-lg transition-all"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
      </button>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-500">
      {/* Header Info */}
      <div className="glass-card p-10 rounded-[40px] flex flex-col md:flex-row items-center gap-10">
        <div className="relative group">
          <img 
            src={user.avatar || `https://ui-avatars.com/api/?name=${user.name}&size=256&background=0ea5e9&color=fff`} 
            className="w-48 h-48 rounded-[40px] object-cover shadow-2xl" 
            alt={user.name} 
          />
          <button className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center rounded-[40px] transition-opacity">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
          </button>
        </div>

        <div className="flex-grow text-center md:text-left">
          <h1 className="text-4xl font-black mb-1">{user.name}</h1>
          <p className="text-slate-500 font-medium mb-4">{user.location || 'Location not set'}</p>
          <p className="text-primary-600 dark:text-primary-400 font-bold text-sm mb-1">@{user.email.split('@')[0]}_6776</p>
          <div className="mt-6 flex flex-wrap gap-2 justify-center md:justify-start">
            <span className="bg-primary-500/10 text-primary-600 px-4 py-1.5 rounded-xl text-xs font-bold border border-primary-500/20">Active Learner</span>
            <span className="bg-blue-500/10 text-blue-600 px-4 py-1.5 rounded-xl text-xs font-bold border border-blue-500/20">Skill Mentor</span>
          </div>
        </div>
      </div>

      {/* Profile Details Grid */}
      <div className="grid md:grid-cols-2 gap-4">
        <FieldEdit label="Education" field="education" value={user.education} />
        <FieldEdit label="Mobile" field="phone" value={user.phone} />
        <FieldEdit label="Profession" field="profession" value={user.profession} />
        <FieldEdit label="Purpose" field="purpose" value={user.purpose} />
      </div>

      <div className="space-y-4">
        <div className="glass-card p-8 rounded-3xl group relative">
          <label className="block text-[10px] font-black uppercase text-slate-400 mb-4">About Me</label>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">
            {user.bio || 'No description provided yet. Add a short bio to let others know who you are!'}
          </p>
          <button 
            onClick={() => setIsEditing(true)}
            className="absolute top-8 right-8 p-2 opacity-0 group-hover:opacity-100 text-primary-500 hover:bg-primary-50 rounded-lg transition-all"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="glass-card p-8 rounded-3xl group relative">
            <label className="block text-[10px] font-black uppercase text-slate-400 mb-4">Skills</label>
            <div className="flex flex-wrap gap-2">
              {user.skills.length > 0 ? user.skills.map((s, i) => (
                <span key={i} className="bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-lg text-xs font-bold">{s}</span>
              )) : <span className="text-slate-400 text-sm italic">Nothing to see here... yet!</span>}
            </div>
            <button 
              onClick={() => setIsEditing(true)}
              className="absolute top-8 right-8 p-2 opacity-0 group-hover:opacity-100 text-primary-500 hover:bg-primary-50 rounded-lg transition-all"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
            </button>
          </div>
          <div className="glass-card p-8 rounded-3xl group relative">
            <label className="block text-[10px] font-black uppercase text-slate-400 mb-4">Interests</label>
            <div className="flex flex-wrap gap-2">
              {user.interests.length > 0 ? user.interests.map((s, i) => (
                <span key={i} className="bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-lg text-xs font-bold">{s}</span>
              )) : <span className="text-slate-400 text-sm italic">Nothing to see here... yet!</span>}
            </div>
            <button 
              onClick={() => setIsEditing(true)}
              className="absolute top-8 right-8 p-2 opacity-0 group-hover:opacity-100 text-primary-500 hover:bg-primary-50 rounded-lg transition-all"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
            </button>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {isEditing && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm" onClick={() => setIsEditing(false)}></div>
          <div className="relative w-full max-w-2xl glass-card rounded-3xl shadow-2xl p-10 animate-in zoom-in-95 duration-200 overflow-y-auto max-h-[90vh]">
            <h2 className="text-2xl font-black mb-8">Edit Profile</h2>
            
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {[
                { label: 'Name', field: 'name' },
                { label: 'Email', field: 'email' },
                { label: 'Mobile', field: 'phone' },
                { label: 'Profession', field: 'profession' },
                { label: 'Education', field: 'education' },
                { label: 'Location', field: 'location' },
                { label: 'Purpose', field: 'purpose' },
              ].map(f => (
                <div key={f.field}>
                  <label className="block text-xs font-black uppercase text-slate-400 mb-2">{f.label}</label>
                  <input 
                    type="text" 
                    value={(editData as any)[f.field] || ''} 
                    onChange={(e) => setEditData({...editData, [f.field]: e.target.value})}
                    className="w-full bg-slate-100 dark:bg-slate-800 rounded-xl px-4 py-3 text-sm focus:ring-2 ring-primary-500 outline-none"
                  />
                </div>
              ))}
            </div>

            <div className="mb-8">
              <label className="block text-xs font-black uppercase text-slate-400 mb-2">About Us</label>
              <textarea 
                value={editData.bio || ''} 
                onChange={(e) => setEditData({...editData, bio: e.target.value})}
                className="w-full h-32 bg-slate-100 dark:bg-slate-800 rounded-xl px-4 py-3 text-sm focus:ring-2 ring-primary-500 outline-none"
              />
            </div>

            <div className="flex gap-4">
              <button 
                onClick={handleSave}
                className="flex-grow py-4 bg-primary-600 text-white rounded-2xl font-bold hover:bg-primary-700 transition-all shadow-xl shadow-primary-600/30"
              >
                Save Changes
              </button>
              <button 
                onClick={() => setIsEditing(false)}
                className="px-8 py-4 bg-white dark:bg-slate-800 border dark:border-slate-700 rounded-2xl font-bold hover:bg-slate-50 transition-all"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
