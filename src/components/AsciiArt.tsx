const ART = String.raw`    _              _
   / \     _ __   (_)  ___   _   _
  / _ \   | '__|  | | / __| | | | |
 / ___ \  | |     | | \__ \ | |_| |
/_/   \_\ |_|     |_| |___/  \__,_|`;

export function AsciiArt() {
  return (
    <pre className="ascii" aria-hidden="true">
      {ART}
    </pre>
  );
}
