from decimal import Decimal

from django.db import migrations, models


def update_openrouter_model(apps, schema_editor):
    settings_model = apps.get_model("dishes", "RecipeAutomationSettings")
    settings_model.objects.filter(model="gpt-6-astra").update(model="openai/gpt-5-mini")


class Migration(migrations.Migration):
    dependencies = [("dishes", "0013_recipepost_recipeautomationsettings")]

    operations = [
        migrations.AlterField(
            model_name="recipeautomationsettings",
            name="model",
            field=models.CharField(default="openai/gpt-5-mini", max_length=120),
        ),
        migrations.AddField(
            model_name="recipeautomationsettings",
            name="temperature",
            field=models.DecimalField(decimal_places=2, default=Decimal("0.80"), max_digits=3),
        ),
        migrations.RunPython(update_openrouter_model, migrations.RunPython.noop),
    ]
