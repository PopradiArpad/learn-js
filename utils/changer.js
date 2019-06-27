const fs = require('fs');

const regex = /(.*)root_models\[(\d+)\](.*)/;

function change_line(line) {
  let changed_line = line;

  const match = line.match(regex);
  if (match) {
    const ix = parseInt(match[2]);

    if (ix >= 2) {
      changed_line = `${match[1]}root_models[${ix+1}]${match[3]}`
    } else {
      console.log(line);
    }
  }

  return changed_line;
}

function change(lines) {
  let changed_lines = [];

  for(const l of lines) {
    changed_lines.push(change_line(l));
  }

  return changed_lines;
}

function main() {
  const name = process.argv[2];

  const lines = fs.readFileSync(name).toString().split('\n');
  // console.log(lines);

  const changed_lines = change(lines);
  console.log(changed_lines.join('\n'));
}

main();
