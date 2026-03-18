const fs = require('fs');
const files = [
    'src/components/admin/DeleteBookButton.tsx',
    'src/components/admin/PostForm.tsx',
    'src/components/admin/BookForm.tsx',
    'src/components/admin/DeleteAuthorButton.tsx',
    'src/components/admin/AuthorForm.tsx',
    'src/app/admin/(dashboard)/blog/page.tsx',
    'src/app/admin/(dashboard)/books/page.tsx',
    'src/app/admin/(dashboard)/authors/page.tsx'
];
files.forEach(f => {
    try {
        let c = fs.readFileSync(f, 'utf8');
        c = c.replace(/@\/app\/admin\/(authors|books|blog)\/actions/g, '@/app/admin/(dashboard)/$1/actions');
        c = c.replace(/from ".\/actions"/g, 'from "@/app/admin/(dashboard)/blog/actions"');
        fs.writeFileSync(f, c);
        console.log(`Updated ${f}`);
    } catch(e) {
        console.log(`Error reading $f`);
    }
});
