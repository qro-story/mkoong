import fs from 'fs';
import path from 'path';

// DBML 파일 경로
const dbmlFilePath = path.join(__dirname, '/mkoong.dbml');

// DBML 파일 읽기
fs.readFile(dbmlFilePath, 'utf8', (err: any, data: any) => {
  if (err) {
    console.error('Error reading DBML file:', err);
    return;
  }

  // 테이블 이름 추출
  const tableMatches = data.match(/Table\s+(\w+)\s*\{/g);
  if (!tableMatches) {
    console.error('No tables found in DBML file.');
    return;
  }

  const tableNames: string[] = tableMatches.map((match) => match.split(' ')[1]);

  console.log(tableNames);

  // 테이블 폴더 생성
  tableNames.forEach((tableName) => {
    const tableFilePath = path.join(
      __dirname,
      `/libs/core/databases/entities/${tableName.toLowerCase()}.entity.ts`,
    );
    if (!fs.existsSync(tableFilePath)) {
      fs.writeFileSync(tableFilePath, '');
      console.log(`Created file: ${tableFilePath}`);
    } else {
      console.log(`File already exists: ${tableFilePath}`);
    }
  });
});
