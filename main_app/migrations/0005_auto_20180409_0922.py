# Generated by Django 2.0.3 on 2018-04-09 07:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main_app', '0004_auto_20180409_0913'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product_base',
            name='tech_tag',
            field=models.ManyToManyField(blank=True, related_name='product_tech', to='main_app.Tech_tag_base'),
        ),
    ]
