{
  nixpkgs,
  system,
}:
let
  pkgs = import nixpkgs { inherit system; };

  corePackages = with pkgs; [
    bun
  ];
in
{
  packages.${system}.default = corePackages;

  devShells.${system} = {
    default = pkgs.mkShell {
      buildInputs = corePackages ++ [
        # Nix development tools
        pkgs.nixfmt-rfc-style
        pkgs.nixfmt-tree
        pkgs.statix
        pkgs.deadnix
        pkgs.nil

        # Cloudflare
        pkgs.nodePackages.wrangler
      ];

      shellHook = ''
        echo "🦉 hoo dev shell"
        echo "  bun:      $(bun --version)"
        echo "  nil:      $(nil --version 2>&1 | cut -d' ' -f2)"
      '';
    };

    # minimal ci shell - only bun needed to build
    ci = pkgs.mkShell {
      buildInputs = [ pkgs.bun ];
    };
  };
}
