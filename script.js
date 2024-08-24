const promptInput = document.getElementById('promptInput');
const terminal = document.getElementById('terminal');
const terminalWindow = document.getElementById('terminalWindow');
const date = document.getElementById('date');

promptInput.focus();
date.innerText = new Date().toDateString()
terminalWindow.addEventListener('click', () => promptInput.focus());


promptInput.addEventListener('keydown', (event) => {
  if (event.key === "Enter") {
    enterCommand(event);
  }
})

const enterCommand = (event) => {
  const promptElement = document.getElementById('promptClone').cloneNode(true);
  promptElement.classList.remove('hidden');
  promptElement.getElementsByClassName('promptCloneInput')[0].innerHTML = event.target.value;
  promptElement.setAttribute('id', null);
  promptElement.getElementsByClassName('promptCloneContent')[0].appendChild(selectCommandBlock(event.target.value));
  terminal.appendChild(promptElement);
  promptInput.value = '';
  promptInput.scrollIntoView({block: 'start'});
}


const selectCommandBlock = (command) => {
  const lowerCommand = command.split(' ')[0].toLowerCase()
  switch (lowerCommand) {
    case 'help':
    case 'about':
    case 'social':
    case 'skills':
    case 'education':
    case 'experience':
    case 'contact':
      return getCommandTemplate(lowerCommand); //TODO ADD CREDITS COMMAND?
    case 'clear':
      return clearCommand();
    case 'sudo':
      return notAuthCommand();
    case 'chill':
      return disableAnimationsCommand();
    default:
      return notFoundCommand(command);
  }
}

const getCommandTemplate = (command) => {
  const element = document.getElementById(command).cloneNode(true);
  element.classList.remove('hidden');
  element.setAttribute('id', null);
  return element;
}

const clearCommand = () => {
  terminal.innerHTML = '';
  const element = document.createElement('span');
  return element;
}

const notFoundCommand = (command) => {
  const element = document.createElement('span');
  element.innerText = `-bash: ${command}: command not found. Type 'help' for help`;
  element.classList.add('error');
  return element;
}

const notAuthCommand = (command) => {
  const element = document.createElement('span');
  element.innerText = `You do not have root access on this machine. The proper authorities have been notified.`;
  element.classList.add('error');
  return element;
}

const disableAnimationsCommand = () => {
  var anims = document.querySelectorAll(".animation");
  anims.forEach((a) => {
    a.style.display = "none";
  });
  const element = document.createElement('span');
  element.innerText = `Upgrading display technologies...`;
  element.classList.add('command');
  return element;
}