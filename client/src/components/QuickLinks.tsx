import './QuickLinks.scss';
import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
//import Button from '@mui/material/Button';
import { supabase } from '../supabase';
import { ButtonBase } from '@mui/material';

type QuickLink = {
  id: string;
  url: string;
  label: string;
};

export function QuickLinks() {
  const [links, setLinks] = useState<QuickLink[]>([]);

  useEffect(() => {
    console.log('[QuickLinks] Fetching via supabase client...');

    const fetchLinks = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session?.user) return;

      const { data, error } = await supabase
        .from('quicklinks')
        .select('*')
        .order('createdAt', { ascending: false });

      if (error) {
        console.error('Error fetching quick links:', error);
        return;
      }
      setLinks(data);
    };

    fetchLinks();
  }, []);

  return (
    <div className="dashboard-container">
      <div className="quick-links">
        <div className="quick-link-header">
          <h2>Quick Links</h2>
        </div>
        <div className="quick-links-list">
          {links.map((link) => (
            <div key={link.id}>
              <Button
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                variant="outlined"
                className="quick-link-item"
              >
                {link.label}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default QuickLinks;
