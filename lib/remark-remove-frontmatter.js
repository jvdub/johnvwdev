// This remark plugin removes YAML frontmatter from the MDX AST.
function remarkRemoveFrontmatter() {
  return (tree) => {
    if (!tree.children) return;
    tree.children = tree.children.filter((node) => node.type !== "yaml");
  };
}
module.exports = remarkRemoveFrontmatter;
