# Generated by Django 4.1.7 on 2023-06-21 20:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('market', '0018_alter_bookproduct_category'),
    ]

    operations = [
        migrations.AlterField(
            model_name='bookproduct',
            name='category',
            field=models.CharField(blank=True, max_length=200, null=True),
        ),
    ]