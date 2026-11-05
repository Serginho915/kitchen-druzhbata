from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):
    dependencies = [("dishes", "0012_alter_specialoffer_banner_required")]

    operations = [
        migrations.CreateModel(
            name="RecipePost",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("title", models.CharField(max_length=255)),
                ("slug", models.SlugField(allow_unicode=True, blank=True, max_length=280, unique=True)),
                ("excerpt", models.TextField(blank=True)),
                ("content", models.TextField()),
                ("cover_image", models.ImageField(blank=True, null=True, upload_to="recipes/")),
                ("is_published", models.BooleanField(default=True)),
                ("published_at", models.DateTimeField(default=django.utils.timezone.now)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("updated_at", models.DateTimeField(auto_now=True)),
            ],
            options={"ordering": ["-published_at"]},
        ),
        migrations.CreateModel(
            name="RecipeAutomationSettings",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("prompt", models.TextField()),
                ("frequency_days", models.PositiveSmallIntegerField(default=7)),
                ("is_enabled", models.BooleanField(default=True)),
                ("model", models.CharField(default="gpt-6-astra", max_length=80)),
                ("next_run_at", models.DateTimeField(default=django.utils.timezone.now)),
                ("last_run_at", models.DateTimeField(blank=True, null=True)),
                ("last_error", models.TextField(blank=True)),
                ("updated_at", models.DateTimeField(auto_now=True)),
            ],
            options={"verbose_name_plural": "Recipe automation settings"},
        ),
    ]
