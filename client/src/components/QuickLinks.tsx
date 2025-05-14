import './QuickLinks.scss'; 
import { devLinks } from "../data/devLinks";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';


function QuickLinks() {

    const links = devLinks.map((link, index) => (
        <div key={index} className="quick-link-item">
            <Button 
                component="a" 
                variant='outlined' 
                href={link.url} 
                target="_blank" 
                rel="noopener noreferrer"
                size="medium"
                className="quick-link-button"
            >
                {link.label}
            </Button>
        </div>
    ));

    return (
        <div className="dashboard-container">
            <div className="quick-links">
                <div className="quick-link-header">
                    <h2>Quick Links</h2>
                </div>
                <div className="quick-links-list">
                    <Stack spacing={1}>
                        {links}  
                    </Stack>
                </div>   
            </div>
        </div>
    );
}

export default QuickLinks;