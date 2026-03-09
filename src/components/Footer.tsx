export function Footer() {
  return (
    <footer className="border-t bg-muted/40 text-muted-foreground">
      <div className="container py-8 md:py-12">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-center text-sm md:text-left">
            &copy; {new Date().getFullYear()} Wonder Path Press. All rights reserved.
          </p>
          <div className="flex gap-4 text-sm">
            <a href="#" className="hover:text-foreground" aria-label="Privacy Policy">Privacy</a>
            <a href="#" className="hover:text-foreground" aria-label="Terms of Service">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

