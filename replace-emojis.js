const fs = require('fs');

const files = [
  'src/screens/tanda-bahaya/KejangScreen.tsx',
  'src/screens/tanda-bahaya/MuntahScreen.tsx',
  'src/screens/tanda-bahaya/PenurunanKesadaranScreen.tsx',
  'src/screens/tanda-bahaya/SesakNafasScreen.tsx'
];

function replaceInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');

  // ⚠️ Apa Berbahaya? -> <View style={{flexDirection:'row', alignItems:'center', marginBottom:4}}><Feather name="alert-triangle" size={14} color="#FF6B35" /><Text style={[styles.warningTitle, {marginBottom:0, marginLeft:6}]}>Apa Berbahaya?</Text></View>
  content = content.replace(/<Text style=\{styles.warningTitle\}>\s*⚠️\s*(.*?)\s*<\/Text>/g, 
    '<View style={{ flexDirection: "row", alignItems: "center", marginBottom: 4 }}>\n                  <Feather name="alert-triangle" size={14} color="#FF6B35" />\n                  <Text style={[styles.warningTitle, { marginBottom: 0, marginLeft: 6 }]}>$1</Text>\n                </View>'
  );

  // 🔍 Tanda Mulai Dehidrasi or similar
  content = content.replace(/<Text style=\{styles.cautionTitle\}>\s*🔍\s*(.*?)\s*<\/Text>/g, 
    '<View style={{ flexDirection: "row", alignItems: "center", marginBottom: 4 }}>\n                  <Feather name="search" size={14} color="#FF9800" />\n                  <Text style={[styles.cautionTitle, { marginBottom: 0, marginLeft: 6 }]}>$1</Text>\n                </View>'
  );

  // ✅ within sectionTitle 
  content = content.replace(/<Text style=\{styles.sectionTitle\}>\s*✅\s*(.*?)\s*<\/Text>/g, 
    '<View style={{ flexDirection: "row", alignItems: "center", marginBottom: 12, paddingBottom: 8, borderBottomWidth: 2, borderBottomColor: "#2B9FFF" }}>\n                <Feather name="check-circle" size={18} color="#1E3A8A" />\n                <Text style={[styles.sectionTitle, { marginBottom: 0, paddingBottom: 0, borderBottomWidth: 0, marginLeft: 8 }]}>$1</Text>\n              </View>'
  );

  // ⚠️ within sectionTitle
  content = content.replace(/<Text style=\{styles.sectionTitle\}>\s*⚠️\s*(.*?)\s*<\/Text>/g, 
    '<View style={{ flexDirection: "row", alignItems: "center", marginBottom: 12, paddingBottom: 8, borderBottomWidth: 2, borderBottomColor: "#2B9FFF" }}>\n                <Feather name="alert-triangle" size={18} color="#1E3A8A" />\n                <Text style={[styles.sectionTitle, { marginBottom: 0, paddingBottom: 0, borderBottomWidth: 0, marginLeft: 8 }]}>$1</Text>\n              </View>'
  );

  // ✅ within actionTitle
  content = content.replace(/<Text style=\{styles.actionTitle\}>\s*✅\s*(.*?)\s*<\/Text>/g, 
    '<View style={{ flexDirection: "row", alignItems: "center", marginBottom: 4 }}>\n                  <Feather name="check-circle" size={14} color="#4CAF50" />\n                  <Text style={[styles.actionTitle, { marginBottom: 0, marginLeft: 6 }]}>$1</Text>\n                </View>'
  );

  fs.writeFileSync(filePath, content);
}

files.forEach(replaceInFile);
