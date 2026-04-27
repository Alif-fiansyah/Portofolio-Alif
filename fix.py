import os
import re

def fix_mojibake(filename):
    if not os.path.exists(filename): return
    
    with open(filename, 'rb') as f:
        raw_bytes = f.read()

    # The file might be utf-8 string that was read as cp1252 and saved as utf-8.
    text = raw_bytes.decode('utf-8', errors='replace')
    
    # Let's do string replacement for known mojibake
    reps = {
        'ðŸ˜”': '😔',
        'ðŸ˜•': '😕',
        'ðŸ™‚': '🙂',
        'ðŸŽ‰': '🎉',
        'ðŸ’¡': '💡',
        'âœ…': '✅',
        'âŒ': '❌',
        'â Œ': '❌',
        'â€”': '—',
        'â”€â”€': '──',
        'ðŸ’Ž': '💎',
        'âœ•': '✕',
        "âš ï¸ ": "⚠️",
        "âš\xa0ï¸\x8f": "⚠️",
        "âš\xa0ï¸ ": "⚠️",
        "Ilustration": "Illustration",
        "LIFIANZHI": "ALIFIANSYAH"
    }
    
    for k, v in reps.items():
        text = text.replace(k, v)
        
    # emojis with confusing mojibake (same characters mapped in cp1252 due to drops)
    text = re.sub(r'data-rating="1"[^>]*>[^<]*</button>', r'data-rating="1" data-label="That bad, huh?">😔</button>', text)
    text = re.sub(r'data-rating="2"[^>]*>[^<]*</button>', r'data-rating="2" data-label="Room to improve">😕</button>', text)
    text = re.sub(r'data-rating="3"[^>]*>[^<]*</button>', r'data-rating="3" data-label="Pretty okay!">😐</button>', text)
    text = re.sub(r'data-rating="4"[^>]*>[^<]*</button>', r'data-rating="4" data-label="Glad you liked it!">🙂</button>', text)
    text = re.sub(r'data-rating="5"[^>]*>[^<]*</button>', r'data-rating="5" data-label="You made my day! 🎉">😍</button>', text)
    
    # script.js icons block
    text = re.sub(r"help:\s*'.*?',\s*success:\s*'.*?',\s*warning:\s*'.*?',\s*error:\s*'.*?',", 
                  "help: '💡',\n    success: '✅',\n    warning: '⚠️',\n    error: '❌',", text, flags=re.DOTALL)
    
    # footer
    text = text.replace('&copy; 2024 alif.dev â€” All rights reserved', '&copy; 2024 alif.dev — All rights reserved')
    
    with open(filename, 'w', encoding='utf-8') as f:
        f.write(text)
        
for f in ['index.html', 'script.js', 'style.css']:
    fix_mojibake(f)
    print(f"Fixed {f}")
