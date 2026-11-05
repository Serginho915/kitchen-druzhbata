import time

from django.core.management.base import BaseCommand

from dishes.recipe_generation import generate_recipe


class Command(BaseCommand):
    help = "Continuously publishes AI recipe posts when the configured schedule is due."

    def add_arguments(self, parser):
        parser.add_argument("--poll-interval", type=int, default=300)
        parser.add_argument("--once", action="store_true")

    def handle(self, *args, **options):
        while True:
            try:
                post = generate_recipe()
                if post:
                    self.stdout.write(self.style.SUCCESS(f"Published: {post.title}"))
            except Exception as exc:
                self.stderr.write(f"Recipe generation failed: {exc}")
            if options["once"]:
                break
            time.sleep(max(options["poll_interval"], 30))
