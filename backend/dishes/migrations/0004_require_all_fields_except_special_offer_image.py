from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("dishes", "0003_dish_description"),
    ]

    operations = [
        migrations.AlterField(
            model_name="dish",
            name="category",
            field=models.CharField(max_length=255),
        ),
        migrations.AlterField(
            model_name="dish",
            name="description",
            field=models.TextField(),
        ),
        migrations.AlterField(
            model_name="dish",
            name="image",
            field=models.ImageField(null=True, upload_to="dishes/"),
        ),
        migrations.AlterField(
            model_name="dish",
            name="is_spicy",
            field=models.BooleanField(),
        ),
        migrations.AlterField(
            model_name="dish",
            name="weight",
            field=models.PositiveIntegerField(),
        ),
    ]
