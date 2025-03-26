const formatError = (errorMessage: string) => {
    return errorMessage
      .replace(/\/app\/tmp-\d+-\S+\.c/g, "📄 [YourCode.c]") // Replace long paths
      .replace(/error: (.+)/g, "❌ **Error:** $1") // Bold error messages
      .replace(/note: (.+)/g, "💡 **Note:** $1") // Bold notes
      .replace(/(\d+) \| (.+)/g, "   → `$2`") // Format code lines
      .replace(/(\s+\^+)/g, "     🡆 `$1`") // Point to error location
      .replace(/\n/g, "<br>"); // Preserve new lines for HTML rendering
  };
  