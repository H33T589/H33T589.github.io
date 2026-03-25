function typeOutput(container, text, className = '') {
  const div = document.createElement('div');
  div.className = `output-line ${className}`.trim();
  container.appendChild(div);

  let i = 0;
  const speed = 20;
  function type() {
    if (i < text.length) {
      div.textContent += text.charAt(i);
      i++;
      const parent = container.parentElement;
      if (parent) parent.scrollTop = parent.scrollHeight;
      setTimeout(type, speed);
    }
  }
  type();
}

function typeCommand(container, text) {
  const div = document.createElement('div');
  div.className = 'output-line command';
  div.textContent = `guest@portfolio:~$ ${text}`;
  container.appendChild(div);
}

function addLine(container, text, type = '') {
  const div = document.createElement('div');
  div.className = `output-line ${type}`.trim();
  div.textContent = text;
  container.appendChild(div);
  const parent = container.parentElement;
  if (parent) parent.scrollTop = parent.scrollHeight;
}

export function initTerminal(site) {
  const terminalInput = document.getElementById('terminalInput');
  const terminalSend = document.getElementById('terminalSend');
  const terminalOutput = document.getElementById('terminalOutput');
  if (!terminalInput || !terminalSend || !terminalOutput) return;

  const email = site.terminal?.email ?? 'hitkumarp589@gmail.com';
  const subject = site.terminal?.emailSubject ?? 'Portfolio Inquiry';

  function handleSend() {
    const rawInput = terminalInput.value.trim();
    const input = rawInput.toLowerCase();

    if (!rawInput) return;

    typeCommand(terminalOutput, rawInput);
    terminalInput.value = '';

    if (input === 'clear') {
      setTimeout(() => {
        terminalOutput.innerHTML = '';
        addLine(terminalOutput, 'Terminal cleared.', 'success');
      }, 200);
      return;
    }

    if (input === 'help') {
      typeOutput(
        terminalOutput,
        'Available Commands: ls, cat [project], whoami, rust, matrix, status, clear, [message]'
      );
      return;
    }

    if (input === 'ls' || input === 'll') {
      typeOutput(terminalOutput, 'DerbyOS-web/  Spatial-Audio/  Quantum-Alg/  CLI-Tools/');
      return;
    }

    if (input.startsWith('cat ')) {
      const project = input.split(' ')[1] ?? '';
      if (project.includes('derby')) {
        typeOutput(
          terminalOutput,
          'DerbyOS: Monte Carlo race simulation. Language: Vanilla JS.'
        );
      } else if (project.includes('spatial')) {
        typeOutput(
          terminalOutput,
          'Spatial-Audio: 3D HRTF Audio Engine. Language: Web Audio API.'
        );
      } else if (project.includes('quantum')) {
        typeOutput(
          terminalOutput,
          "Quantum-Alg: Grover's & Shor's Algorithms. Language: Python/Qiskit."
        );
      } else if (project.includes('cli') || project.includes('rust')) {
        const cli = site.projects.find((p) => p.id === 'rust-cli');
        typeOutput(
          terminalOutput,
          cli
            ? `${cli.title}: ${cli.description}`
            : 'CLI-Tools: Fast Rust utilities for terminal workflows.'
        );
      } else {
        typeOutput(terminalOutput, `cat: ${project}: No such file or directory`, 'error');
      }
      return;
    }

    if (input === 'whoami') {
      typeOutput(terminalOutput, 'heet');
      return;
    }

    if (input === 'rust' || input === 'cargo') {
      typeOutput(
        terminalOutput,
        "\n🦀\n// Rust is safe and fast.\n// Memory safety guaranteed without garbage collection.\n",
        'success'
      );
      return;
    }

    if (input.startsWith('sudo')) {
      typeOutput(terminalOutput, '[sudo] password for guest: ******', 'error');
      setTimeout(
        () =>
          typeOutput(
            terminalOutput,
            'guest is not in the sudoers file. This incident will be reported.',
            'error'
          ),
        1000
      );
      return;
    }

    if (input === 'matrix') {
      typeOutput(terminalOutput, 'Wake up, Neo...', 'success');
      document.body.style.textShadow = '0 0 5px #0f0';
      document.body.style.color = '#0f0';
      return;
    }

    if (input === 'status') {
      typeOutput(terminalOutput, '--- SYSTEM DIAGNOSTICS ---');
      setTimeout(() => typeOutput(terminalOutput, 'UPTIME: 99.99%'), 500);
      setTimeout(() => typeOutput(terminalOutput, 'QUANTUM COHERENCE: STABLE'), 1000);
      setTimeout(() => typeOutput(terminalOutput, 'RUST COMPILER: ACTIVE'), 1500);
      setTimeout(() => typeOutput(terminalOutput, 'MEMORY LEAKS: NONE'), 2000);
      return;
    }

    typeOutput(terminalOutput, 'Processing transmission...');
    setTimeout(() => {
      typeOutput(terminalOutput, 'Encrypting packet with AES-256...', 'success');
      setTimeout(() => {
        window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(rawInput)}`;
      }, 1500);
    }, 1000);
  }

  terminalSend.addEventListener('click', handleSend);
  terminalInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleSend();
  });
}
